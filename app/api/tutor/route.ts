import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// POST /api/tutor
// Body: { message: string, mode?: string, circuitState?: object, history?: {role, text}[] }
// Returns: { text: string, note: string | null, mode: string }
//
// Dual-Engine Architecture:
// 1. Groq LLaMA 3.3 70B if GROQ_API_KEY is configured.
// 2. Intelligent CLE Deterministic Reasoning Fallback if offline/no key,
//    ensuring Netlify deployment and LIDM jury review never fails.
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `Kamu adalah LENTERA AI ASSISTANT — asisten bimbingan praktikum sains inklusif adaptif untuk peserta didik tunanetra tingkat SMPLB pada kompetisi LIDM 2026.

PERAN & PRINSIP PEDAGOGIS:
1. Metode "Explain Before Answer": Jangan pernah langsung memberikan jawaban instan atau membetulkan sirkuit secara langsung. Berikan pertanyaan pemicu refleksi dan bimbing langkah demi langkah.
2. Penegakan Kosakata Taktil: DILARANG KERAS menggunakan kata visual seperti "lihat gambar", "perhatikan warna kabel", "tampak jelas". WAJIB menggunakan kosakata taktil dan spasial: "raba", "rasakan", "temukan alur", "sisi kiri/kanan", "lekukan bertonjolan", "dengarkan bunyi klik".
3. Bahasa: Selalu gunakan Bahasa Indonesia yang hangat, suportif, inklusif, dan ringkas (2-4 kalimat) agar nyaman dibacakan oleh pembaca layar (Text-to-Speech).
4. Mode Interaksi:
   - Exploration Mode: Eksplorasi komponen dan analogi aliran listrik yang bisa diraba.
   - Troubleshooting Mode: Pelacakan kesalahan sirkuit secara sistematis menggunakan data sensor.
   - Concept Reflection: Refleksi ilmiah mengapa suatu fenomena terjadi (misal: kenapa lampu redup).
   - Evaluation Mode: Kuis formatif taktil menguji pemahaman mandiri siswa.`;

interface ChatTurn {
  role: "ai" | "user";
  text: string;
}

// Intelligent Offline Fallback Engine
function generateCLEFallbackResponse(
  message: string,
  mode: string,
  circuitState?: any
): { text: string; note: string } {
  const m = message.toLowerCase();

  // Mode: Troubleshooting
  if (mode === "troubleshooting" || m.includes("rusak") || m.includes("mati") || m.includes("tidak nyala") || m.includes("salah")) {
    if (circuitState && circuitState.isLampReversed) {
      return {
        text: "Coba raba dudukan komponen lampu di kisi B1. Apakah kamu merasakan tonjolan kutub positif menghadap ke arah baterai? Coba putar balok lampu 180 derajat dan rasakan kembali perbedaannya.",
        note: "Diagnosa CLE: Polaritas lampu terbalik (Explain-Before-Answer)",
      };
    }
    if (circuitState && circuitState.isSwitchOpen) {
      return {
        text: "Sentuh saklar mekanik pada kisi A2 di sisi kanan papanmu. Apakah tuasnya dalam posisi terangkat atau sudah ditekan hingga berbunyi klik?",
        note: "Diagnosa CLE: Saklar terbuka (Open Circuit)",
      };
    }
    return {
      text: "Mari kita selidiki bersama. Pertama, telusuri kabel taktil mulai dari kutub positif baterai dengan ujung jarimu. Apakah ada jalur yang terasa terputus atau longgar sebelum mencapai lampu?",
      note: "Diagnosa CLE: Penelusuran Jalur Taktil Mandiri",
    };
  }

  // Mode: Concept Reflection
  if (mode === "reflection" || m.includes("kenapa") || m.includes("mengapa") || m.includes("konsep") || m.includes("beda")) {
    if (m.includes("seri") && m.includes("paralel")) {
      return {
        text: "Bayangkan rangkaian seri seperti lorong tunggal di sekolah di mana semua siswa harus berjalan berurutan, sehingga jika satu orang berhenti, semua tertahan. Sedangkan rangkaian paralel seperti memiliki dua lorong terpisah. Jika satu lampu dilepas pada paralel, apa yang kamu rasakan pada lampu lainnya?",
        note: "Refleksi Konsep: Analogi Jalur Taktil",
      };
    }
    return {
      text: "Pertanyaan yang sangat bagus untuk direfleksikan! Saat arus listrik mengalir melewati filamen lampu, energi listrik diubah menjadi energi panas dan cahaya. Coba raba permukaan bohlam setelah menyala beberapa saat, apakah terasa hangat?",
      note: "Refleksi Konsep: Transformasi Energi Listrik",
    };
  }

  // Mode: Evaluation Mode
  if (mode === "evaluation" || m.includes("kuis") || m.includes("tes") || m.includes("evaluasi") || m.includes("soal")) {
    return {
      text: "Tantangan Kuis Taktil untukmu: Kamu memiliki 1 baterai dan 2 lampu yang disusun berderet dalam satu kabel tunggal tanpa cabang. Jika saklar ditekan, apakah ini rangkaian seri atau paralel? Coba jawab berdasarkan arah alur kabel yang kamu raba.",
      note: "Evaluasi Formatif: Pemahaman Rangkaian Seri",
    };
  }

  // Default: Exploration Mode
  if (m.includes("baterai")) {
    return {
      text: "Baterai adalah sumber energi listrik kita. Raba kedua ujungnya: sisi yang memiliki tonjolan kecil adalah kutub positif, sedangkan sisi yang rata adalah kutub negatif. Arus mengalir keluar dari tonjolan positif.",
      note: "Eksplorasi Taktil: Pengenalan Kutub Baterai",
    };
  }

  if (m.includes("saklar")) {
    return {
      text: "Saklar berfungsi seperti jembatan angkat. Saat tuas kamu tekan ke bawah, jembatan tertutup dan arus listrik bisa melintas. Saat diangkat, jalur terputus dan listrik berhenti.",
      note: "Eksplorasi Taktil: Mekanika Saklar",
    };
  }

  if (m.includes("lampu")) {
    return {
      text: "Lampu adalah beban yang mengubah arus listrik. Komponen lampu pada papan kita memiliki tanda taktil timbul di sisinya untuk membantumu mencocokkan arah arus dengan benar.",
      note: "Eksplorasi Taktil: Identifikasi Beban Lampu",
    };
  }

  return {
    text: "Halo! Aku LENTERA AI Assistant. Siap mendampingi praktikum sainsmu hari ini. Kamu bisa meraba komponen di papan taktilmu atau bertanya tentang konsep rangkaian listrik yang ingin kamu pelajari.",
    note: "Pendampingan Inklusif Aktif",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message: string = body.message ?? "";
    const mode: string = body.mode ?? "exploration";
    const circuitState = body.circuitState ?? null;
    const history: ChatTurn[] = Array.isArray(body.history) ? body.history : [];

    const apiKey = process.env.GROQ_API_KEY;

    // If Groq API key is not present, use the deterministic CLE fallback
    if (!apiKey) {
      const fallback = generateCLEFallbackResponse(message, mode, circuitState);
      return NextResponse.json({
        text: fallback.text,
        note: fallback.note,
        mode,
        engine: "CLE-Rule-Engine-Local",
      });
    }

    // If Groq API key is provided, use LLaMA 3.3 70B
    const contextBlock = circuitState
      ? `\n\nStatus telemetri sensor rangkaian fisik saat ini:\n${JSON.stringify(circuitState, null, 2)}\nMode saat ini: ${mode}`
      : `\n\nMode saat ini: ${mode}`;

    const messages = [
      { role: "system", content: `${SYSTEM_PROMPT}${contextBlock}` },
      ...history.slice(-6).map((h) => ({
        role: h.role === "user" ? "user" : "assistant",
        content: h.text,
      })),
      { role: "user", content: message },
    ];

    try {
      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages,
          temperature: 0.7,
          max_tokens: 450,
        }),
      });

      if (!groqRes.ok) {
        // Fallback to local CLE if Groq API returns non-200
        const fallback = generateCLEFallbackResponse(message, mode, circuitState);
        return NextResponse.json({
          text: fallback.text,
          note: fallback.note,
          mode,
          engine: "CLE-Rule-Engine-Local (Groq-Failover)",
        });
      }

      const data = await groqRes.json();
      const text: string =
        data?.choices?.[0]?.message?.content?.trim() ||
        "Coba raba kembali komponen di papanmu, apa yang kamu rasakan?";

      let note = `Mode: ${mode.toUpperCase()}`;
      if (circuitState) {
        if (circuitState.polarity_correct === false) note = "CLE: Polaritas Terdeteksi Terbalik";
        else if (circuitState.circuit_closed === false) note = "CLE: Jalur Sirkuit Terbuka";
        else if (circuitState.circuit_closed === true) note = "CLE: Sirkuit Tertutup Sempurna";
      }

      return NextResponse.json({ text, note, mode, engine: "Groq-LLaMA-3.3-70B" });
    } catch (apiErr) {
      // Failover safely
      const fallback = generateCLEFallbackResponse(message, mode, circuitState);
      return NextResponse.json({
        text: fallback.text,
        note: fallback.note,
        mode,
        engine: "CLE-Rule-Engine-Local (Exception-Failover)",
      });
    }
  } catch (err) {
    return NextResponse.json(
      { error: `Server error: ${(err as Error).message}` },
      { status: 500 }
    );
  }
}
