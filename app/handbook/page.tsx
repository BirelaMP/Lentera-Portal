"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen, Volume2, VolumeX, CheckCircle2, Circle, Sparkles,
  ArrowRight, Cpu, Eye, Compass, Lightbulb, Battery, ToggleRight,
  AlertTriangle, Play, Pause, Bookmark
} from "lucide-react";

interface Chapter {
  id: string;
  number: number;
  title: string;
  tagline: string;
  braille: string;
  readTime: string;
  summary: string;
  content: {
    sectionTitle: string;
    text: string;
    tactileInstruction: string;
    brailleSnippet?: string;
  }[];
  labSimulationLink: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: "ch1",
    number: 1,
    title: "Komponen Rangkaian Listrik",
    tagline: "Electrical Components",
    braille: "⠅⠕⠍⠏⠕⠝⠑⠝ ⠇⠊⠎⠞⠗⠊⠅",
    readTime: "5 menit membaca",
    summary: "Mengenal bentuk fisik, tekstur taktil, dan fungsi baterai, saklar, lampu, serta kabel penghantar.",
    labSimulationLink: "/cle",
    content: [
      {
        sectionTitle: "1.1 Baterai: Sumber Aliran Energi",
        text: "Baterai adalah penyedia energi potensial listrik. Listrik mengalir karena adanya perbedaan muatan antara dua kutub. Arus mengalir keluar dari kutub positif menuju kutub negatif.",
        tactileInstruction: "Raba kedua ujung balok baterai. Ujung yang memiliki tonjolan bundar adalah kutub positif (+). Ujung yang rata dan halus adalah kutub negatif (-).",
        brailleSnippet: "⠃⠁⠞⠑⠗⠁⠊ [+] [-]",
      },
      {
        sectionTitle: "1.2 Saklar: Jembatan Aliran Listrik",
        text: "Saklar berfungsi memutus atau menyambungkan aliran listrik. Dalam posisi terbuka (OFF), arus terhenti. Dalam posisi tertutup (ON), jalur sirkuit menyatu.",
        tactileInstruction: "Sentuh tuas saklar di sisi kanan papan. Tekan tuas ke bawah sampai berbunyi 'klik'. Bunyi klik menandakan kontak logam telah saling bersentuhan.",
        brailleSnippet: "⠎⠁⠅⠇⠁⠗ [⠕⠝/⠕⠋⠋]",
      },
      {
        sectionTitle: "1.3 Lampu: Indikator & Beban Listrik",
        text: "Lampu mengubah energi listrik menjadi energi panas dan cahaya. Lampu LED memiliki sifat polaritas satu arah: ia hanya akan menyala jika anoda terhubung ke positif baterai.",
        tactileInstruction: "Raba sisi dudukan lampu. Terdapat satu garis timbul memanjang yang menandakan kaki anoda (+). Pastikan garis timbul menghadap jalur positif baterai.",
        brailleSnippet: "⠇⠁⠍⠏⠥",
      },
    ],
  },
  {
    id: "ch2",
    number: 2,
    title: "Rangkaian Seri",
    tagline: "Series Circuit",
    braille: "⠗⠁⠝⠛⠅⠁⠊⠁⠝ ⠎⠑⠗⠊",
    readTime: "7 menit membaca",
    summary: "Prinsip rangkaian satu jalur tak terputus. Karakteristik pembagian tegangan dan arus listrik konstan.",
    labSimulationLink: "/cle",
    content: [
      {
        sectionTitle: "2.1 Konsep Alur Jalur Tunggal",
        text: "Pada rangkaian seri, semua komponen listrik dipasang berderet dalam satu kabel loop tertutup. Arus listrik hanya memiliki satu jalan untuk mengalir dari baterai melewati semua komponen.",
        tactileInstruction: "Gunakan jari telunjukmu untuk menelusuri kabel mulai dari kutub baterai (+), melintasi saklar, lalu masuk ke lampu pertama, lampu kedua, dan kembali ke kutub (-). Jalur ini tidak pernah bercabang.",
        brailleSnippet: "⠎⠑⠗⠊ ⠚⠁⠇⠥⠗ ⠞⠥⠝⠛⠛⠁⠇",
      },
      {
        sectionTitle: "2.2 Pengaruh Penambahan Beban",
        text: "Jika kamu menambahkan lampu kedua secara seri, tegangan baterai akan terbagi dua. Akibatnya, nyala kedua lampu akan terasa lebih redup dibandingkan jika hanya ada satu lampu.",
        tactileInstruction: "Raba kehangatan pada bohlam lampu saat satu lampu dipasang, lalu bandingkan rasa hangatnya saat dua lampu dipasang seri. Lampu yang lebih redup memancarkan panas yang lebih halus.",
        brailleSnippet: "⠞⠑⠛⠁⠝⠛⠁⠝ ⠞⠑⠗⠃⠁⠛⠊",
      },
    ],
  },
  {
    id: "ch3",
    number: 3,
    title: "Rangkaian Paralel",
    tagline: "Parallel Circuit",
    braille: "⠗⠁⠝⠛⠅⠁⠊⠁⠝ ⠏⠁⠗⠁⠇⠑⠇",
    readTime: "8 menit membaca",
    summary: "Memahami sistem percabangan sirkuit, keunggulan tegangan konstan, dan aplikasi kelistrikan rumah tangga.",
    labSimulationLink: "/cle",
    content: [
      {
        sectionTitle: "3.1 Konsep Percabangan Jalur",
        text: "Pada rangkaian paralel, kabel penghantar terbagi menjadi dua atau lebih cabang independen. Tiap beban mendapatkan tegangan penuh yang sama dari sumber baterai.",
        tactileInstruction: "Raba titik percabangan 'T-junction' pada papan. Jarimu akan merasakan kawat taktil membelah menjadi dua arah: satu menuju lampu cabang atas, satu menuju lampu cabang bawah.",
        brailleSnippet: "⠏⠁⠗⠁⠇⠑⠇ ⠉⠁⠃⠁⠝⠛",
      },
      {
        sectionTitle: "3.2 Keandalan Sistem",
        text: "Jika salah satu lampu pada rangkaian paralel dilepas atau rusak, lampu di cabang lainnya tetap menyala stabil karena jalurnya terpisah. Inilah mengapa instalasi rumah menggunakan rangkaian paralel.",
        tactileInstruction: "Coba angkat balok lampu cabang atas. Raba lampu cabang bawah, rasakan bahwa sirkuit cabang bawah tetap tertutup dan menyala normal.",
        brailleSnippet: "⠎⠊⠎⠞⠑⠍ ⠍⠁⠝⠙⠊⠗⠊",
      },
    ],
  },
  {
    id: "ch4",
    number: 4,
    title: "Troubleshooting & Keselamatan",
    tagline: "Troubleshooting & Electrical Safety",
    braille: "⠞⠗⠕⠥⠃⠇⠑⠎⠓⠕⠕⠞⠊⠝⠛",
    readTime: "6 menit membaca",
    summary: "Metode sentuhan pengujian sirkuit, deteksi kesalahan polaritas terbalik, korsleting, dan checklist mandiri.",
    labSimulationLink: "/cle",
    content: [
      {
        sectionTitle: "4.1 Metode Raba Jalur (Tactile Tracing)",
        text: "Jika lampu tidak menyala, jangan panik. Lakukan metode penelusuran taktil berurutan dari baterai ke saklar, ke lampu, hingga kembali ke ground.",
        tactileInstruction: "Gunakan teknik 4 jari: 1) Pastikan kutub baterai terpasang rapat, 2) Periksa tuas saklar apakah sudah berbunyi klik, 3) Periksa orientasi kutub lampu, 4) Pastikan kabel taktil tidak terlepas dari soket.",
        brailleSnippet: "⠗⠁⠃⠁ ⠚⠁⠇⠥⠗",
      },
      {
        sectionTitle: "4.2 Peringatan Korsleting (Hubungan Singkat)",
        text: "Korsleting terjadi jika kutub positif langsung terhubung ke kutub negatif tanpa melewati beban lampu. Hal ini menyebabkan baterai cepat panas dan sirkuit mati otomatis.",
        tactileInstruction: "Jika baterai mulai terasa hangat saat dipegang, segera angkat saklar ke posisi terbuka (OFF) dan pisahkan kawat yang bersinggungan langsung.",
        brailleSnippet: "⠃⠁⠓⠁⠽⠁ ⠅⠕⠗⠎⠇⠑⠞⠊⠝⠛",
      },
    ],
  },
];

export default function HandbookPage() {
  const [activeChapterId, setActiveChapterId] = useState<string>("ch1");
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({
    ch1: true,
    ch2: true,
    ch3: false,
    ch4: false,
  });
  const [isBrailleMode, setIsBrailleMode] = useState<boolean>(true);
  const [speakingChapterId, setSpeakingChapterId] = useState<string | null>(null);

  const activeChapter = CHAPTERS.find((c) => c.id === activeChapterId) || CHAPTERS[0];

  const toggleChapterComplete = (id: string) => {
    setCompletedChapters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const speakChapter = (ch: Chapter) => {
    if (!("speechSynthesis" in window)) return;
    if (speakingChapterId === ch.id) {
      window.speechSynthesis.cancel();
      setSpeakingChapterId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setSpeakingChapterId(ch.id);

    const fullText = `Bab ${ch.number}: ${ch.title}. ${ch.summary}. ${ch.content
      .map((sec) => `${sec.sectionTitle}. ${sec.text}. Instruksi sentuhan: ${sec.tactileInstruction}`)
      .join(". ")}`;

    const utter = new SpeechSynthesisUtterance(fullText);
    utter.lang = "id-ID";
    utter.rate = parseFloat(localStorage.getItem("lentera_speech_rate") || "1.0");
    utter.onend = () => setSpeakingChapterId(null);
    utter.onerror = () => setSpeakingChapterId(null);
    window.speechSynthesis.speak(utter);
  };

  const completedCount = Object.values(completedChapters).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / CHAPTERS.length) * 100);

  return (
    <main className="min-h-screen bg-cs-bg px-4 py-8 font-body text-cs-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-bold text-cs-primaryDeep">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Digital Tactile Handbook — LIDM 2026</span>
            </div>
            <h1 className="mt-2 font-heading text-3xl font-black text-cs-text sm:text-4xl">
              Buku Panduan Digital Praktikum Sains Inklusif
            </h1>
            <p className="mt-1 text-sm text-cs-textSoft">
              Buku panduan kurikulum IPA kelistrikan dengan narasi suara teks-ke-suara, kode Braille, dan panduan sentuhan taktil.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsBrailleMode(!isBrailleMode)}
              className={`flex items-center gap-1.5 rounded-2xl border px-4 py-2.5 text-xs font-bold transition ${
                isBrailleMode
                  ? "border-purple-300 bg-purple-100 text-cs-primaryDeep"
                  : "border-gray-200 bg-white text-cs-textSoft hover:bg-gray-50"
              }`}
            >
              <span>Kode Braille: {isBrailleMode ? "Tampil" : "Sembunyi"}</span>
            </button>

            <button
              onClick={() => speakChapter(activeChapter)}
              className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold shadow-md transition ${
                speakingChapterId === activeChapter.id
                  ? "bg-amber-400 text-black animate-pulse"
                  : "bg-cs-primaryDeep text-white hover:bg-cs-primaryHover shadow-purple-500/25"
              }`}
            >
              <Volume2 className="h-4 w-4" />
              <span>{speakingChapterId === activeChapter.id ? "Hentikan Suara" : "Bacakan Bab Ini"}</span>
            </button>
          </div>
        </div>

        {/* Reading Progress Card */}
        <div className="card rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm backdrop-blur-md">
          <div className="flex items-center justify-between text-xs">
            <span className="font-heading font-extrabold text-cs-text">
              Progres Membaca Buku Panduan: {completedCount} dari {CHAPTERS.length} Bab Selesai
            </span>
            <span className="font-mono font-bold text-cs-primaryDeep">{progressPercent}%</span>
          </div>
          <div className="mt-2 h-2.5 w-full rounded-full bg-purple-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Chapter Navigation & Reader */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Chapters Navigation */}
          <div className="space-y-3 lg:col-span-4">
            <div className="card rounded-3xl border border-white/80 bg-white/90 p-5 shadow-md backdrop-blur-md">
              <h3 className="font-heading text-xs font-extrabold uppercase tracking-wider text-cs-primaryDeep border-b border-gray-100 pb-3">
                Daftar Bab Pembelajaran:
              </h3>

              <div className="mt-3 space-y-2">
                {CHAPTERS.map((ch) => {
                  const active = activeChapterId === ch.id;
                  const done = completedChapters[ch.id];
                  return (
                    <div
                      key={ch.id}
                      onClick={() => setActiveChapterId(ch.id)}
                      className={`card flex cursor-pointer items-start justify-between rounded-2xl border p-3.5 transition ${
                        active
                          ? "border-cs-primaryDeep bg-purple-50/90 ring-2 ring-cs-primaryDeep"
                          : "border-gray-200 bg-gray-50/70 hover:bg-white"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-cs-primaryDeep">
                          <span>BAB {ch.number}</span>
                          <span>·</span>
                          <span>{ch.readTime}</span>
                        </div>
                        <h4 className="mt-0.5 font-heading text-xs font-black text-cs-text line-clamp-1">
                          {ch.title}
                        </h4>
                        {isBrailleMode && (
                          <div className="mt-1 font-mono text-xs text-purple-700 select-all tracking-wider">
                            {ch.braille}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleChapterComplete(ch.id);
                        }}
                        className="ml-2 mt-1 text-gray-400 hover:text-emerald-600"
                        title={done ? "Tandai belum selesai" : "Tandai selesai"}
                      >
                        {done ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Circle className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Active Chapter Content Reader */}
          <div className="space-y-6 lg:col-span-8">
            <div className="card rounded-3xl border border-white/80 bg-white/95 p-6 shadow-xl backdrop-blur-xl sm:p-8">
              {/* Chapter Header */}
              <div className="border-b border-gray-100 pb-5">
                <div className="flex items-center justify-between text-xs text-cs-textSoft">
                  <span className="font-mono font-bold uppercase text-cs-primaryDeep">
                    BAB {activeChapter.number} · {activeChapter.tagline}
                  </span>
                  <span>{activeChapter.readTime}</span>
                </div>

                <h2 className="mt-2 font-heading text-2xl font-black text-cs-text sm:text-3xl">
                  {activeChapter.title}
                </h2>

                {isBrailleMode && (
                  <div className="mt-2 rounded-xl bg-purple-50 p-2.5 font-mono text-sm font-bold text-cs-primaryDeep tracking-widest">
                    Braille: {activeChapter.braille}
                  </div>
                )}

                <p className="mt-3 text-sm leading-relaxed text-cs-textSoft">
                  {activeChapter.summary}
                </p>
              </div>

              {/* Sections Breakdown */}
              <div className="mt-8 space-y-8">
                {activeChapter.content.map((sec, idx) => (
                  <article key={idx} className="space-y-3">
                    <h3 className="font-heading text-base font-extrabold text-cs-text">
                      {sec.sectionTitle}
                    </h3>
                    <p className="text-sm leading-relaxed text-cs-text">
                      {sec.text}
                    </p>

                    {/* Tactile Guide Box (Special for visually impaired) */}
                    <div className="rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/70 p-4">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-cs-primaryDeep">
                        <Compass className="h-4 w-4" />
                        <span>Panduan Sentuhan Taktil (Eksplorasi Mandiri):</span>
                      </div>
                      <p className="mt-1.5 text-xs font-semibold leading-relaxed text-cs-text">
                        "{sec.tactileInstruction}"
                      </p>
                    </div>

                    {isBrailleMode && sec.brailleSnippet && (
                      <div className="text-[11px] text-purple-700 font-mono">
                        Kode Braille Istilah: <span className="bg-purple-100 px-2 py-0.5 rounded">{sec.brailleSnippet}</span>
                      </div>
                    )}
                  </article>
                ))}
              </div>

              {/* Bottom Action: Test in CLE Lab */}
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">
                <button
                  onClick={() => toggleChapterComplete(activeChapter.id)}
                  className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition ${
                    completedChapters[activeChapter.id]
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>
                    {completedChapters[activeChapter.id] ? "Bab Selesai Dipelajari ✓" : "Tandai Bab Selesai"}
                  </span>
                </button>

                <Link
                  href={activeChapter.labSimulationLink}
                  className="flex items-center gap-2 rounded-2xl bg-cs-primaryDeep px-6 py-3 text-xs font-bold text-white shadow-md shadow-purple-500/25 transition hover:bg-cs-primaryHover"
                >
                  <Cpu className="h-4 w-4" />
                  <span>Uji Materi Ini di Lab Simulasi CLE</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
