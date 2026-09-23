"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Cpu, Zap, AlertTriangle, CheckCircle2, Clock, Sparkles, Volume2,
  VolumeX, ArrowRight, Play, RotateCcw, HelpCircle, Check, Info,
  Lightbulb, ToggleLeft, ToggleRight, Layers, Sliders, Battery, ChevronRight,
  GitBranch, CheckSquare, Search, ShieldCheck
} from "lucide-react";
import HardwareStatusBadge from "@/components/HardwareStatusBadge";

type ScenarioId = "wrong_polarity" | "perfect_series" | "open_switch" | "short_circuit";

interface ScenarioData {
  id: ScenarioId;
  name: string;
  tag: string;
  battery: { status: "Connected" | "Disconnected"; voltage: string; polarity: "Normal" | "Reversed" };
  switchComp: { status: "Connected" | "Disconnected"; state: "Closed (ON)" | "Open (OFF)" };
  lamp: { status: "Connected" | "Disconnected"; condition: "Wrong Polarity" | "Normal" | "Unpowered" | "Short Circuit" };
  diagnosis: string;
  confidenceScore: number;
  cognitiveReasoningTrace: {
    sensorInput: string;
    connectivity: string;
    polarity: string;
    misconception: string;
    decision: string;
    feedbackStrategy: string;
  };
  explainBeforeAnswer: {
    tactileHint: string;
    flowReasoning: string;
    actionCorrection: string;
  };
  recommendation: {
    title: string;
    desc: string;
    handbookChapter: string;
    handbookLink: string;
  };
  timeline: { time: string; step: string; detail: string }[];
}

const SCENARIOS: Record<ScenarioId, ScenarioData> = {
  wrong_polarity: {
    id: "wrong_polarity",
    name: "Kesalahan Polaritas Lampu Terbalik",
    tag: "Kasus Prioritas LIDM",
    battery: { status: "Connected", voltage: "3.0V", polarity: "Normal" },
    switchComp: { status: "Connected", state: "Closed (ON)" },
    lamp: { status: "Connected", condition: "Wrong Polarity" },
    diagnosis: "Kesalahan terdeteksi: Kemungkinan polaritas lampu terbalik",
    confidenceScore: 97.4,
    cognitiveReasoningTrace: {
      sensorInput: "Wrong Polarity terdeteksi pada node Lampu (B1/D1)",
      connectivity: "PASSED (Closed Loop — Jalur kawat sirkuit tersambung)",
      polarity: "FAILED (Reverse Bias — Anoda menghadap kutub negatif)",
      misconception: "Siswa menempatkan sisi rata lampu ke jalur tegangan positif",
      decision: "Physical Assembly Error (Miskonsepsi Orientasi Kutub Komponen)",
      feedbackStrategy: "Explain Before Answer — Bimbing observasi rabaan tanda timbul",
    },
    explainBeforeAnswer: {
      tactileHint: "Coba raba tanda positif dan negatif pada dudukan komponen lampu.",
      flowReasoning: "Arus listrik searah hanya dapat mengalir dari kutub positif ke anoda lampu LED. Jika terbalik, lampu tidak akan berpijar.",
      actionCorrection: "Putar posisi balok lampu 180 derajat pada grid papan taktil hingga kutub bertonjolan menyentuh jalur positif baterai.",
    },
    recommendation: {
      title: "Memahami Polaritas Komponen Listrik",
      desc: "Latihan mengenali tanda taktil kutub anoda dan katoda pada beban listrik.",
      handbookChapter: "Bab 1: Komponen Rangkaian Listrik",
      handbookLink: "/handbook#ch1",
    },
    timeline: [
      { time: "00:00.012", step: "Sensor Ingestion", detail: "Membaca arus I=0.00A pada V=3.00V dari telemetri papan taktil" },
      { time: "00:00.038", step: "Topology Graph Analysis", detail: "Sirkuit loop tertutup terdeteksi, impedansi tak terhingga pada node B1" },
      { time: "00:00.065", step: "Misconception Pattern Matching", detail: "Pola cocok 97.4% dengan aturan: Reversed Diode/LED Orientation" },
      { time: "00:00.092", step: "Pedagogical Scaffolding", detail: "Menerapkan metode Explain-Before-Answer tanpa langsung membocorkan kunci jawaban" },
    ],
  },
  perfect_series: {
    id: "perfect_series",
    name: "Rangkaian Seri Sempurna (Normal)",
    tag: "Kondisi Ideal",
    battery: { status: "Connected", voltage: "3.0V", polarity: "Normal" },
    switchComp: { status: "Connected", state: "Closed (ON)" },
    lamp: { status: "Connected", condition: "Normal" },
    diagnosis: "Rangkaian tertutup sempurna! Arus listrik mengalir stabil.",
    confidenceScore: 99.2,
    cognitiveReasoningTrace: {
      sensorInput: "Semua komponen terpasang sesuai tata letak grid B3, A2, B1",
      connectivity: "PASSED (Closed Loop — Loop tunggal lengkap tanpa celah)",
      polarity: "PASSED (Forward Bias — Orientasi kutub sesuai alur arus DC)",
      misconception: "Tidak terdeteksi miskonsepsi. Pemahaman siswa optimal.",
      decision: "Perakitan Berhasil (Mastery Level 2 Sempurna)",
      feedbackStrategy: "Positive Reinforcement & Tantangan Lanjutan Level 3",
    },
    explainBeforeAnswer: {
      tactileHint: "Rasakan kehangatan halus pada lampu dan dengarkan nada konfirmasi taktil.",
      flowReasoning: "Semua komponen tersambung dalam satu loop tunggal tanpa hambatan putus.",
      actionCorrection: "Pertahankan rangkaian ini atau coba tambahkan satu lampu lagi secara seri untuk menguji pembagian tegangan.",
    },
    recommendation: {
      title: "Eksperimen Tingkat Lanjut: Rangkaian Paralel",
      desc: "Pelajari bagaimana percabangan jalur mempertahankan terang lampu.",
      handbookChapter: "Bab 3: Rangkaian Paralel",
      handbookLink: "/handbook#ch3",
    },
    timeline: [
      { time: "00:00.010", step: "Sensor Ingestion", detail: "Arus nominal I=0.25A, Tegangan V=3.00V terukur stabil" },
      { time: "00:00.029", step: "Topology Verification", detail: "Loop tertutup dari kutub (+) baterai melintasi saklar dan lampu ke (-)" },
      { time: "00:00.048", step: "Evaluation Engine", detail: "Kriteria praktikum Level 2 terpenuhi 100%" },
      { time: "00:00.070", step: "Mastery Increment", detail: "Menambahkan skor kemandirian siswa +15 XP" },
    ],
  },
  open_switch: {
    id: "open_switch",
    name: "Saklar Terbuka / Jalur Terputus",
    tag: "Open Circuit",
    battery: { status: "Connected", voltage: "3.0V", polarity: "Normal" },
    switchComp: { status: "Connected", state: "Open (OFF)" },
    lamp: { status: "Connected", condition: "Unpowered" },
    diagnosis: "Kesalahan terdeteksi: Rangkaian terbuka, arus listrik terputus",
    confidenceScore: 98.8,
    cognitiveReasoningTrace: {
      sensorInput: "Open Circuit — Hambatan tak hingga pada node kisi A2",
      connectivity: "FAILED (Open Loop — Saklar dalam status terangkat/terbuka)",
      polarity: "PENDING (Tidak dapat diuji saat arus nol)",
      misconception: "Siswa lupa menekan tuas saklar mekanik ke posisi ON",
      decision: "Circuit Discontinuity (Kontak Saklar Terbuka)",
      feedbackStrategy: "Explain Before Answer — Bimbing rabaan bunyi 'klik' saklar",
    },
    explainBeforeAnswer: {
      tactileHint: "Coba raba tuas saklar pada posisi kisi A2 di sisi kanan papan.",
      flowReasoning: "Listrik membutuhkan jalur tak terputus untuk mengalir. Saklar yang terbuka memisahkan kontak penghantar.",
      actionCorrection: "Tekan tuas saklar hingga berbunyi 'klik' agar plat logam menyatu dan menutup sirkuit.",
    },
    recommendation: {
      title: "Mekanisme Saklar & Kontinuitas Sirkuit",
      desc: "Pelajari peran saklar mekanik sebagai pemutus dan penyambung aliran elektron.",
      handbookChapter: "Bab 2: Rangkaian Seri",
      handbookLink: "/handbook#ch2",
    },
    timeline: [
      { time: "00:00.014", step: "Sensor Ingestion", detail: "Tegangan terminal baterai 3.0V, arus sirkuit 0.00A" },
      { time: "00:00.035", step: "Loop Continuity Test", detail: "Diskontinuitas terdeteksi pada node saklar grid A2" },
      { time: "00:00.061", step: "Fault Identification", detail: "Kontak terbuka (Open Circuit), bukan kerusakan komponen" },
      { time: "00:00.088", step: "Instruction Dispatch", detail: "Petunjuk fokus pada tuas saklar taktil" },
    ],
  },
  short_circuit: {
    id: "short_circuit",
    name: "Hubungan Singkat (Short Circuit)",
    tag: "Peringatan Keselamatan",
    battery: { status: "Connected", voltage: "2.8V", polarity: "Normal" },
    switchComp: { status: "Connected", state: "Closed (ON)" },
    lamp: { status: "Connected", condition: "Short Circuit" },
    diagnosis: "Peringatan: Terdeteksi korsleting / arus memotong beban lampu",
    confidenceScore: 99.5,
    cognitiveReasoningTrace: {
      sensorInput: "Overcurrent Alert — Lonjakan arus I > 2.0A, V drop ke 2.8V",
      connectivity: "WARNING (Bypass Loop — Impedansi mendekati 0.05 Ohm)",
      polarity: "N/A (Beban terpotong langsung)",
      misconception: "Kawat konduktor positif dan negatif saling bersentuhan sebelum lampu",
      decision: "Critical Safety Hazard (Korsleting / Bypass Beban)",
      feedbackStrategy: "Immediate Emergency Alert — Lepas saklar dan pisahkan kawat",
    },
    explainBeforeAnswer: {
      tactileHint: "Raba alur kabel di sekitar lampu, apakah ada kawat taktil yang bersinggungan langsung?",
      flowReasoning: "Arus listrik selalu memilih jalur dengan hambatan terendah. Jika kutub positif bertemu negatif tanpa melewati lampu, arus akan melonjak berbahaya.",
      actionCorrection: "Pisahkan kabel penghantar agar arus dipaksa melewati filamen lampu.",
    },
    recommendation: {
      title: "Keselamatan Kerja Praktikum Listrik",
      desc: "Prosedur pencegahan korsleting dan panas berlebih pada komponen baterai.",
      handbookChapter: "Bab 4: Troubleshooting & Keselamatan",
      handbookLink: "/handbook#ch4",
    },
    timeline: [
      { time: "00:00.009", step: "Overcurrent Alert", detail: "Lonjakan arus I=2.10A melebihi batas aman sirkuit" },
      { time: "00:00.024", step: "Impedance Calculation", detail: "Resistansi total terukur mendekati 0.05 Ohm (Bypass)" },
      { time: "00:00.051", step: "Safety Scaffolding", detail: "Mengaktifkan nada peringatan taktil dan instruksi darurat" },
      { time: "00:00.078", step: "System Log", detail: "Mencatat insiden ke log evaluasi guru untuk bimbingan khusus" },
    ],
  },
};

export default function CLEPage() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId>("wrong_polarity");
  const [revealedHintStep, setRevealedHintStep] = useState<number>(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hardwareSource, setHardwareSource] = useState<"esp32" | "simulated">("simulated");

  const scenario = SCENARIOS[selectedScenario];

  const handleScenarioChange = (id: ScenarioId) => {
    setSelectedScenario(id);
    setRevealedHintStep(1);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const speakDiagnosis = () => {
    if (!("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = `${scenario.diagnosis}. Penjelasan adaptif: ${scenario.explainBeforeAnswer.tactileHint}. ${
      revealedHintStep >= 2 ? scenario.explainBeforeAnswer.flowReasoning : ""
    }. ${revealedHintStep >= 3 ? scenario.explainBeforeAnswer.actionCorrection : ""}`;

    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    const utter = new SpeechSynthesisUtterance(textToSpeak);
    utter.lang = "id-ID";
    utter.rate = parseFloat(localStorage.getItem("lentera_speech_rate") || "1.0");
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  return (
    <main className="min-h-screen bg-cs-bg px-4 py-8 font-body text-cs-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-bold text-cs-primaryDeep">
              <Cpu className="h-3.5 w-3.5" />
              <span>Core Innovation #2 — LIDM 2026</span>
            </div>
            <h1 className="mt-2 font-heading text-3xl font-black text-cs-text sm:text-4xl">
              Context-Aware Learning Engine (CLE)
            </h1>
            <p className="mt-1 text-sm text-cs-textSoft">
              Mesin diagnostik AI yang memahami status telemetri fisik sirkuit dan membimbing dengan metode <em>Explain Before Answer</em>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={speakDiagnosis}
              className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold shadow-md transition ${
                isSpeaking
                  ? "bg-amber-400 text-black animate-pulse"
                  : "bg-cs-primaryDeep text-white hover:bg-cs-primaryHover shadow-purple-500/25"
              }`}
            >
              <Volume2 className="h-4 w-4" />
              <span>{isSpeaking ? "Hentikan Suara" : "Dengarkan Diagnosis (TTS)"}</span>
            </button>

            <Link
              href="/tutor"
              className="flex items-center gap-2 rounded-2xl border border-purple-200 bg-white px-5 py-3 text-xs font-bold text-cs-primaryDeep shadow-xs hover:bg-purple-50"
            >
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span>Tanya LENTERA AI Tutor</span>
            </Link>
          </div>
        </div>

        {/* Focus 1: Hardware-CLE Transparency Layer */}
        <HardwareStatusBadge
          source={hardwareSource}
          onSourceChange={setHardwareSource}
          showArchitecture={true}
        />

        {/* Scenario Switcher Buttons */}
        <div className="card rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm backdrop-blur-md">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cs-primaryDeep">
              Simulasi Kondisi Sirkuit (Pilih untuk Menguji Respon AI):
            </span>
            <span className="text-[11px] text-cs-textSoft">Bebas diuji tanpa hardware fisik</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {Object.values(SCENARIOS).map((s) => (
              <button
                key={s.id}
                onClick={() => handleScenarioChange(s.id)}
                className={`flex flex-col items-start rounded-xl border p-3 text-left transition ${
                  selectedScenario === s.id
                    ? "border-cs-primaryDeep bg-purple-50/80 ring-2 ring-cs-primaryDeep"
                    : "border-gray-200 bg-gray-50/60 hover:bg-white"
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-purple-600">{s.tag}</span>
                <span className="mt-1 text-xs font-extrabold text-cs-text">{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Telemetry & AI Diagnosis */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: SENSOR INPUT TELEMETRY */}
          <div className="space-y-6 lg:col-span-5">
            <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-md backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-cs-primaryDeep">
                    <Sliders className="h-4 w-4" />
                  </span>
                  <div>
                    <h2 className="font-heading text-sm font-extrabold text-cs-text">
                      Sensor Input Telemetry
                    </h2>
                    <p className="text-[10px] text-cs-textSoft">Membaca status fisik komponen taktil</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Sync
                </span>
              </div>

              {/* Component Cards */}
              <div className="mt-5 space-y-3.5">
                {/* Battery Card */}
                <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                      <Battery className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-heading text-xs font-bold text-cs-text">Battery (C3 / B3)</div>
                      <div className="text-[11px] text-cs-textSoft">
                        Tegangan: {scenario.battery.voltage} · Kutub: {scenario.battery.polarity}
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800">
                    {scenario.battery.status}
                  </span>
                </div>

                {/* Switch Card */}
                <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                      <ToggleRight className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-heading text-xs font-bold text-cs-text">Switch (A2)</div>
                      <div className="text-[11px] text-cs-textSoft">
                        Posisi: {scenario.switchComp.state}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                      scenario.switchComp.state.includes("Closed")
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {scenario.switchComp.status}
                  </span>
                </div>

                {/* Lamp Card */}
                <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                      <Lightbulb className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-heading text-xs font-bold text-cs-text">Lamp (B1 / C1)</div>
                      <div className="text-[11px] text-cs-textSoft">Beban Listrik LED Taktil</div>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                      scenario.lamp.condition === "Normal"
                        ? "bg-emerald-100 text-emerald-800"
                        : scenario.lamp.condition === "Wrong Polarity"
                        ? "bg-rose-100 text-rose-800 animate-pulse font-extrabold"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {scenario.lamp.condition}
                  </span>
                </div>
              </div>

              {/* SVG Board Circuit Miniature */}
              <div className="mt-5 rounded-2xl bg-[#0B0F19] p-4 text-white">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Visual Papan Sirkuit</span>
                  <span className="font-mono text-cyan-400">Grid D3-A1</span>
                </div>
                <div className="my-2 aspect-[16/9] w-full rounded-xl bg-[#050811] flex items-center justify-center">
                  <svg viewBox="0 0 280 150" className="h-full w-full">
                    <rect
                      x="30"
                      y="25"
                      width="220"
                      height="100"
                      rx="16"
                      fill="none"
                      stroke={scenario.id === "perfect_series" ? "#34D399" : "#F43F5E"}
                      strokeWidth="3.5"
                      strokeDasharray={scenario.id === "perfect_series" ? "6 3" : "4 4"}
                    />
                    <rect x="105" y="15" width="70" height="22" rx="4" fill="#334155" stroke="#A855F7" strokeWidth="1.5" />
                    <text x="140" y="30" fill="#FFFFFF" fontSize="9" textAnchor="middle" fontWeight="bold">BATERAI</text>
                    <rect x="238" y="60" width="24" height="30" rx="4" fill="#334155" stroke="#38BDF8" strokeWidth="1.5" />
                    <text x="250" y="78" fill="#94A3B8" fontSize="7" textAnchor="middle">SW</text>
                    <rect
                      x="105"
                      y="114"
                      width="70"
                      height="22"
                      rx="4"
                      fill={scenario.id === "perfect_series" ? "#FEF08A" : "#334155"}
                      stroke={scenario.id === "perfect_series" ? "#EAB308" : "#F43F5E"}
                      strokeWidth="1.5"
                    />
                    <text
                      x="140"
                      y="129"
                      fill={scenario.id === "perfect_series" ? "#713F12" : "#FDA4AF"}
                      fontSize="9"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      LAMPU
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: AI DIAGNOSIS, COGNITIVE REASONING TRACE & EXPLAIN BEFORE ANSWER */}
          <div className="space-y-6 lg:col-span-7">
            {/* AI Diagnosis Panel */}
            <div className="card relative overflow-hidden rounded-3xl border border-white/80 bg-white/95 p-6 shadow-xl backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-extrabold text-cs-text">
                      AI Diagnosis & Context Analysis
                    </h3>
                    <p className="text-xs text-cs-textSoft">
                      Metode Pedagogis: <em>Explain Before Answer</em>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-2xl bg-purple-50 px-3.5 py-1.5 border border-purple-200">
                  <span className="text-[11px] font-bold text-cs-textSoft">Confidence Score:</span>
                  <span className="font-heading text-sm font-extrabold text-cs-primaryDeep">
                    {scenario.confidenceScore}%
                  </span>
                </div>
              </div>

              {/* Diagnosis Callout */}
              <div
                className={`mt-5 rounded-2xl p-4.5 border transition ${
                  scenario.id === "perfect_series"
                    ? "bg-emerald-50/90 border-emerald-300 text-emerald-950"
                    : scenario.id === "wrong_polarity"
                    ? "bg-amber-50/90 border-amber-300 text-amber-950"
                    : "bg-rose-50/90 border-rose-300 text-rose-950"
                }`}
              >
                <div className="flex items-start gap-3">
                  {scenario.id === "perfect_series" ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-cs-textSoft">
                      Hasil Analisis Topologi Sensor:
                    </div>
                    <div className="mt-1 font-heading text-lg font-black leading-snug">
                      "{scenario.diagnosis}"
                    </div>
                  </div>
                </div>
              </div>

              {/* Focus 2: Cognitive Reasoning Trace (Competitor-Beating AI Detail) */}
              <div className="mt-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50/40 p-5">
                <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-indigo-700" />
                    <span className="font-heading text-xs font-black uppercase tracking-wider text-indigo-950">
                      Cognitive Reasoning Trace (Audit Penalaran Kognitif AI)
                    </span>
                  </div>
                  <span className="rounded bg-indigo-200 px-2 py-0.5 font-mono text-[9px] font-bold text-indigo-900">
                    Rule + LLM Ingestion
                  </span>
                </div>

                <div className="mt-4 grid gap-2.5 text-xs">
                  <div className="flex items-start justify-between rounded-xl bg-white p-2.5 border border-indigo-100">
                    <span className="font-semibold text-cs-textSoft">1. Sensor Input:</span>
                    <span className="font-mono font-bold text-cs-text text-right max-w-xs">
                      {scenario.cognitiveReasoningTrace.sensorInput}
                    </span>
                  </div>

                  <div className="flex items-start justify-between rounded-xl bg-white p-2.5 border border-indigo-100">
                    <span className="font-semibold text-cs-textSoft">2. Checking Connectivity:</span>
                    <span className="font-mono font-bold text-indigo-800 text-right">
                      {scenario.cognitiveReasoningTrace.connectivity}
                    </span>
                  </div>

                  <div className="flex items-start justify-between rounded-xl bg-white p-2.5 border border-indigo-100">
                    <span className="font-semibold text-cs-textSoft">3. Checking Polarity:</span>
                    <span className={`font-mono font-bold text-right ${scenario.cognitiveReasoningTrace.polarity.includes("FAILED") ? "text-rose-600" : "text-emerald-700"}`}>
                      {scenario.cognitiveReasoningTrace.polarity}
                    </span>
                  </div>

                  <div className="flex items-start justify-between rounded-xl bg-white p-2.5 border border-indigo-100">
                    <span className="font-semibold text-cs-textSoft">4. Misconception Pattern:</span>
                    <span className="font-semibold text-purple-900 text-right max-w-xs">
                      {scenario.cognitiveReasoningTrace.misconception}
                    </span>
                  </div>

                  <div className="flex items-start justify-between rounded-xl bg-indigo-100/70 p-2.5 border border-indigo-200">
                    <span className="font-bold text-indigo-950">5. Pedagogical Decision:</span>
                    <span className="font-bold text-indigo-950 text-right">
                      {scenario.cognitiveReasoningTrace.decision}
                    </span>
                  </div>

                  <div className="flex items-start justify-between rounded-xl bg-emerald-50 p-2.5 border border-emerald-200">
                    <span className="font-bold text-emerald-950">6. Feedback Strategy:</span>
                    <span className="font-bold text-emerald-800 text-right">
                      {scenario.cognitiveReasoningTrace.feedbackStrategy}
                    </span>
                  </div>
                </div>
              </div>

              {/* Explain Before Answer Stepper Scaffolding */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-xs font-extrabold uppercase tracking-wider text-cs-primaryDeep">
                    Adaptive Scaffolding (Bimbingan Bertahap):
                  </h4>
                  <span className="text-[11px] font-semibold text-cs-textSoft">
                    Langkah Terbuka: {revealedHintStep} dari 3
                  </span>
                </div>

                {/* Hint Step 1: Observasi Taktil */}
                <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-4 transition">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-extrabold text-cs-primaryDeep">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cs-primaryDeep text-[10px] text-white">
                        1
                      </span>
                      Petunjuk 1: Observasi Sentuhan & Taktil
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600">Explain First</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-cs-text">
                    "{scenario.explainBeforeAnswer.tactileHint}"
                  </p>
                </div>

                {/* Hint Step 2: Aliran Konsep & Penalaran */}
                {revealedHintStep >= 2 ? (
                  <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-4 transition animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-xs font-extrabold text-sky-700">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-[10px] text-white">
                          2
                        </span>
                        Petunjuk 2: Penalaran Aliran Arus (Concept Flow)
                      </span>
                      <span className="text-[10px] font-bold text-sky-600">Socratic Reason</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-cs-text">
                      "{scenario.explainBeforeAnswer.flowReasoning}"
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setRevealedHintStep(2)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 py-3 text-xs font-bold text-cs-textSoft hover:border-cs-primaryDeep hover:text-cs-primaryDeep"
                  >
                    <span>Buka Petunjuk 2 (Jika siswa masih ragu)</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}

                {/* Hint Step 3: Tindakan Koreksi */}
                {revealedHintStep >= 3 ? (
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 transition animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-xs font-extrabold text-emerald-700">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">
                          3
                        </span>
                        Petunjuk 3: Tindakan Koreksi Fisik (Action Correction)
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600">Solusi Akhir</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-cs-text">
                      "{scenario.explainBeforeAnswer.actionCorrection}"
                    </p>
                  </div>
                ) : (
                  revealedHintStep === 2 && (
                    <button
                      onClick={() => setRevealedHintStep(3)}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 py-3 text-xs font-bold text-cs-textSoft hover:border-cs-primaryDeep hover:text-cs-primaryDeep"
                    >
                      <span>Buka Solusi Tindakan Koreksi</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )
                )}
              </div>

              {/* Recommendation Card */}
              <div className="mt-6 rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50/70 to-indigo-50/50 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-cs-primaryDeep">
                      AI Learning Recommendation:
                    </div>
                    <div className="mt-0.5 font-heading text-sm font-extrabold text-cs-text">
                      {scenario.recommendation.title}
                    </div>
                    <p className="mt-1 text-xs text-cs-textSoft">
                      {scenario.recommendation.desc}
                    </p>
                  </div>
                  <Link
                    href={scenario.recommendation.handbookLink}
                    className="flex shrink-0 items-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-bold text-cs-primaryDeep shadow-xs hover:bg-purple-50"
                  >
                    <span>Buka {scenario.recommendation.handbookChapter}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Reasoning Timeline Card */}
            <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-md backdrop-blur-md">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <Clock className="h-4 w-4 text-cs-primaryDeep" />
                <h3 className="font-heading text-sm font-extrabold text-cs-text">
                  AI Reasoning Timeline (Audit Jejak Inferensi Milidetik)
                </h3>
              </div>
              <div className="mt-4 space-y-3">
                {scenario.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <span className="font-mono text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                      {step.time}
                    </span>
                    <div className="flex-1">
                      <div className="font-bold text-cs-text">{step.step}</div>
                      <div className="text-cs-textSoft">{step.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
