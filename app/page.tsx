"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  ArrowRight,
  Play,
  CheckCircle2,
  ShieldCheck,
  Heart,
  Cpu,
  Compass,
  Users,
  GraduationCap,
  HeartHandshake,
  Eye,
  Volume2,
  BookOpen,
  ChevronRight,
  ScanEye,
  Layers,
  HelpCircle,
  Activity,
  Sliders,
  Award,
  AlertTriangle
} from "lucide-react";

export default function LandingPage() {
  const [activeBoardTab, setActiveBoardTab] = useState<"normal" | "fault">("normal");
  const [boardSoundActive, setBoardSoundActive] = useState(false);

  const playTactileBeep = (freq = 440) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
      setBoardSoundActive(true);
      setTimeout(() => setBoardSoundActive(false), 300);
    } catch (e) {
      // AudioContext not available
    }
  };

  return (
    <main className="relative overflow-hidden bg-cs-bg font-body text-cs-text">
      {/* Dynamic Ambient Background Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="blob1 absolute -left-48 top-12 h-96 w-96 rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.22), transparent 70%)" }}
        />
        <div
          className="blob2 absolute -right-48 top-64 h-96 w-96 rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.20), transparent 70%)" }}
        />
        <div
          className="blob3 absolute left-1/3 bottom-10 h-80 w-80 rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(52,211,153,0.18), transparent 70%)" }}
        />
        {/* Subtle Braille Dot Pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.035]" aria-hidden="true">
          <pattern id="brailleGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="2" fill="#1E1B4B" />
            <circle cx="6" cy="18" r="2" fill="#1E1B4B" />
            <circle cx="18" cy="6" r="2" fill="#1E1B4B" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#brailleGrid)" />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* HERO SECTION                                                             */}
      {/* ========================================================================= */}
      <section className="relative mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Headlines & Call to Action */}
          <div className="space-y-8 text-center lg:col-span-7 lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-300/80 bg-purple-50/90 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-cs-primaryDeep shadow-xs backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-cs-primaryDeep animate-spin" style={{ animationDuration: "6s" }} />
              <span>Inovasi Digital Pendidikan — LIDM 2026</span>
            </div>

            {/* Main Headlines */}
            <div className="space-y-4">
              <h1 className="font-heading text-4xl font-black tracking-tight text-cs-text sm:text-5xl lg:text-6xl lg:leading-[1.12]">
                <span className="block text-cs-primaryDeep">LENTERA</span>
                Pendamping Praktikum Sains Adaptif bagi Peserta Didik Tunanetra
              </h1>
              <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-cs-textSoft lg:mx-0 lg:text-xl">
                Belajar melalui <strong className="text-cs-text">sentuhan</strong>,{" "}
                <strong className="text-cs-text">suara</strong>, dan{" "}
                <strong className="text-cs-primaryDeep">AI adaptif</strong>. Membuka akses praktikum listrik inklusif tanpa batasan visual.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
              <Link
                href="/student"
                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/30 transition hover:scale-[1.02] hover:shadow-purple-500/40"
              >
                <GraduationCap className="h-5 w-5" />
                <span>Mulai Belajar (Siswa)</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/cle"
                className="flex items-center gap-2 rounded-2xl border-2 border-cs-primaryDeep/20 bg-white/90 px-6 py-3.5 text-sm font-bold text-cs-primaryDeep shadow-md backdrop-blur-md transition hover:border-cs-primaryDeep hover:bg-purple-50"
              >
                <Cpu className="h-5 w-5 text-cs-primaryDeep" />
                <span>Simulasi Praktikum (CLE)</span>
              </Link>

              <Link
                href="/teacher"
                className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/80 px-5 py-3.5 text-sm font-bold text-cs-textSoft shadow-xs backdrop-blur-md transition hover:bg-gray-50 hover:text-cs-text"
              >
                <Users className="h-4 w-4" />
                <span>Dashboard Guru</span>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-left sm:max-w-lg">
              <div className="rounded-2xl border border-white/60 bg-white/70 p-3 shadow-xs backdrop-blur-md">
                <div className="text-xs font-extrabold text-cs-primaryDeep">100% Inklusif</div>
                <div className="text-[11px] text-cs-textSoft">WCAG 2.1 AAA & Braille</div>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/70 p-3 shadow-xs backdrop-blur-md">
                <div className="text-xs font-extrabold text-emerald-600">Explain Before Answer</div>
                <div className="text-[11px] text-cs-textSoft">AI Bimbingan Sokratik</div>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/70 p-3 shadow-xs backdrop-blur-md">
                <div className="text-xs font-extrabold text-sky-600">Tripartite Analytics</div>
                <div className="text-[11px] text-cs-textSoft">Siswa, Guru, Orang Tua</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Smart Tactile Board Widget */}
          <div className="lg:col-span-5">
            <div className="card relative overflow-hidden rounded-3xl border border-white/80 bg-white/85 p-6 shadow-2xl backdrop-blur-xl">
              {/* Header inside Board */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-cs-primaryDeep">
                    <ScanEye className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-extrabold text-cs-text">
                      Smart Tactile Board Visualizer
                    </h3>
                    <p className="text-[10px] font-semibold text-cs-textSoft">
                      Sensor Telemetri & Aliran Listrik Taktil
                    </p>
                  </div>
                </div>

                {/* Scenario Toggle */}
                <div className="flex rounded-xl bg-gray-100 p-1 text-[11px] font-bold">
                  <button
                    onClick={() => {
                      setActiveBoardTab("normal");
                      playTactileBeep(520);
                    }}
                    className={`rounded-lg px-2.5 py-1 transition ${
                      activeBoardTab === "normal"
                        ? "bg-white text-emerald-700 shadow-xs"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Rangkaian Benar
                  </button>
                  <button
                    onClick={() => {
                      setActiveBoardTab("fault");
                      playTactileBeep(320);
                    }}
                    className={`rounded-lg px-2.5 py-1 transition ${
                      activeBoardTab === "fault"
                        ? "bg-rose-50 text-rose-700 shadow-xs"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Simulasi Salah
                  </button>
                </div>
              </div>

              {/* Interactive Circuit Representation */}
              <div className="mt-5 rounded-2xl bg-[#0F172A] p-5 text-white">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-mono">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        activeBoardTab === "normal" ? "bg-emerald-400 animate-ping" : "bg-rose-400 animate-pulse"
                      }`}
                    />
                    Status Sirkuit: {activeBoardTab === "normal" ? "Tertutup (Normal)" : "Salah Polaritas Lampu"}
                  </span>
                  <span className="font-mono text-[10px] text-cyan-300">ESP32 Telemetry: 3.0V</span>
                </div>

                {/* SVG Circuit Canvas */}
                <div className="relative my-4 aspect-[16/10] w-full rounded-xl bg-[#090D16] p-3 flex items-center justify-center">
                  <svg viewBox="0 0 360 200" className="h-full w-full">
                    {/* Wire Circuit Loop */}
                    <rect
                      x="40"
                      y="30"
                      width="280"
                      height="140"
                      rx="20"
                      fill="none"
                      stroke={activeBoardTab === "normal" ? "#34D399" : "#F43F5E"}
                      strokeWidth="4"
                      strokeDasharray={activeBoardTab === "normal" ? "8 4" : "4 4"}
                      className={activeBoardTab === "normal" ? "animate-pulse" : ""}
                    />

                    {/* Top: Battery (B3/C3) */}
                    <g transform="translate(140, 16)">
                      <rect x="0" y="0" width="80" height="28" rx="6" fill="#1E293B" stroke="#A855F7" strokeWidth="2" />
                      <text x="40" y="18" fill="#F8FAFC" fontSize="10" textAnchor="middle" fontWeight="bold">
                        Baterai 3V [+]
                      </text>
                      <text x="70" y="10" fill="#E2E8F0" fontSize="8" fontWeight="bold">⠃⠁</text>
                    </g>

                    {/* Right: Switch (A2) */}
                    <g transform="translate(305, 80)">
                      <rect x="0" y="0" width="30" height="40" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
                      <line x1="15" y1="5" x2="15" y2="35" stroke="#38BDF8" strokeWidth="3" />
                      <text x="15" y="48" fill="#94A3B8" fontSize="8" textAnchor="middle">SAKLAR</text>
                    </g>

                    {/* Bottom: Lamp (B1/C1) */}
                    <g transform="translate(140, 155)">
                      <rect
                        x="0"
                        y="0"
                        width="80"
                        height="30"
                        rx="6"
                        fill={activeBoardTab === "normal" ? "#FEF08A" : "#1E293B"}
                        stroke={activeBoardTab === "normal" ? "#EAB308" : "#F43F5E"}
                        strokeWidth="2"
                      />
                      <text
                        x="40"
                        y="19"
                        fill={activeBoardTab === "normal" ? "#713F12" : "#FDA4AF"}
                        fontSize="10"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        {activeBoardTab === "normal" ? "Lampu Menyala" : "Polaritas Terbalik"}
                      </text>
                    </g>

                    {/* Left: Tactile Grid Pin Indicator */}
                    <g transform="translate(18, 90)">
                      <circle cx="10" cy="10" r="10" fill="#3B82F6" opacity="0.3" />
                      <text x="10" y="13" fill="#60A5FA" fontSize="8" textAnchor="middle" fontWeight="bold">D2</text>
                    </g>
                  </svg>

                  {/* Sound Trigger Button inside Visualizer */}
                  <button
                    onClick={() => playTactileBeep(activeBoardTab === "normal" ? 660 : 280)}
                    aria-label="Bunyikan sinyal taktil rangkaian"
                    className="absolute bottom-2 right-2 flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1 text-[10px] font-bold text-slate-300 hover:bg-white/20"
                  >
                    <Volume2 className="h-3 w-3" />
                    <span>Uji Suara Taktil</span>
                  </button>
                </div>

                {/* Live Diagnosis Snippet */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-purple-300">
                      Diagnosis Context-Aware (CLE):
                    </span>
                    <span className="text-[10px] text-slate-400">Keyakinan AI: 97.4%</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-200">
                    {activeBoardTab === "normal"
                      ? "Rangkaian listrik tertutup sempurna. Arus mengalir dari kutub positif ke beban lampu."
                      : "Kesalahan terdeteksi: Kemungkinan polaritas lampu terbalik. Coba raba tanda positif dan negatif pada dudukan lampu."}
                  </p>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-cs-textSoft">
                  Kompatibel: ESP32-CAM & Tactile Braille Board
                </span>
                <Link
                  href="/cle"
                  className="inline-flex items-center gap-1 font-bold text-cs-primaryDeep hover:underline"
                >
                  Buka Engine Lengkap <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STORYTELLING: PROBLEM → SOLUTION → IMPACT                                */}
      {/* ========================================================================= */}
      <section className="relative border-t border-purple-100/80 bg-gradient-to-b from-purple-50/50 to-white/70 py-16 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-xs font-extrabold uppercase tracking-widest text-cs-primaryDeep">
              Narasi Transformasi Sains Inklusif
            </h2>
            <p className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-cs-text sm:text-4xl">
              Problem → Solution → Impact
            </p>
            <p className="mt-3 text-sm text-cs-textSoft">
              Mengubah keterbatasan visual menjadi kemandirian sains melalui inovasi teknologi digital.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* 1. Problem */}
            <div className="card relative rounded-3xl border-2 border-rose-200 bg-white/95 p-6 shadow-md backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 shadow-sm">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <span className="mt-4 block font-mono text-[10px] font-extrabold uppercase tracking-wider text-rose-600">
                01. The Problem
              </span>
              <h3 className="mt-1 font-heading text-lg font-black text-cs-text">
                Praktikum Berbasis Visual Menjadi Tembok Penghalang
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-cs-textSoft">
                Selama puluhan tahun, praktikum fisika kelistrikan di sekolah bergantung 100% pada penglihatan: warna lampu LED, jarum multimeter analog, dan diagram skematik visual. Siswa tunanetra terpaksa menjadi penonton pasif dan bergantung pada bantuan orang lain.
              </p>
              <div className="mt-4 rounded-xl bg-rose-50 p-2.5 text-[11px] font-semibold text-rose-900 border border-rose-100">
                ⚠️ Akibat: Hilangnya rasa percaya diri dan eksklusi dalam pembelajaran STEM.
              </div>
            </div>

            {/* 2. Solution */}
            <div className="card relative rounded-3xl border-2 border-purple-300 bg-white/95 p-6 shadow-md backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-cs-primaryDeep shadow-sm">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="mt-4 block font-mono text-[10px] font-extrabold uppercase tracking-wider text-cs-primaryDeep">
                02. The Solution
              </span>
              <h3 className="mt-1 font-heading text-lg font-black text-cs-text">
                Sentuhan + Suara + AI Adaptif (Touch + Voice + AI)
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-cs-textSoft">
                LENTERA menghadirkan <strong>Smart Tactile Board</strong> berkode Braille, <strong>Context-Aware Learning Engine (CLE)</strong> yang membaca telemetri sensor, serta <strong>AI Assistant berpedoman Explain Before Answer</strong> yang melarang istilah visual dan memandu tangan siswa secara sokratik.
              </p>
              <div className="mt-4 rounded-xl bg-purple-50 p-2.5 text-[11px] font-semibold text-cs-primaryDeep border border-purple-100">
                ✨ Solusi: Praktikum langsung diraba, didengar, dan dipahami secara mandiri.
              </div>
            </div>

            {/* 3. Impact */}
            <div className="card relative rounded-3xl border-2 border-emerald-200 bg-white/95 p-6 shadow-md backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-sm">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <span className="mt-4 block font-mono text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                03. The Impact
              </span>
              <h3 className="mt-1 font-heading text-lg font-black text-cs-text">
                Kemandirian Belajar Sains Inklusif Sejati
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-cs-textSoft">
                Peningkatan skor kemandirian siswa hingga <strong>84.6%</strong>, deteksi dini miskonsepsi bagi guru, panduan praktikum di rumah bagi orang tua, serta pemenuhan hak aksesibilitas pendidikan sesuai <strong>UU No. 8 Tahun 2016</strong> dan <strong>SDG 4</strong>.
              </p>
              <div className="mt-4 rounded-xl bg-emerald-50 p-2.5 text-[11px] font-semibold text-emerald-900 border border-emerald-100">
                🏆 Dampak: Kesetaraan hak berinovasi bagi generasi muda disabilitas netra.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5 CORE INNOVATIONS SHOWCASE                                              */}
      {/* ========================================================================= */}
      <section className="relative border-t border-purple-100 bg-white/60 py-20 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-xs font-extrabold uppercase tracking-widest text-cs-primaryDeep">
              Pilar Teknologi LIDM 2026
            </h2>
            <p className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-cs-text sm:text-4xl">
              5 Inovasi Inti Pembelajaran Sains Inklusif
            </p>
            <p className="mt-3 text-base text-cs-textSoft">
              Dirancang dengan pendekatan pedagogi inklusif dan kecerdasan buatan kontekstual untuk kemandirian belajar tunanetra.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* 1. Smart Tactile Board */}
            <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-lg backdrop-blur-md transition hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-cs-primaryDeep">
                <ScanEye className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold text-cs-text">
                1. Smart Tactile Board
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cs-textSoft">
                Papan praktikum magnetik dengan penanda Braille dan pengenal komponen terintegrasi sensor ArUco/kamera real-time.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-cs-primaryDeep">
                <Link href="/aruco" className="flex items-center gap-1 hover:underline">
                  Lihat Lab Sensor <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 2. Context-Aware Learning Engine */}
            <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-lg backdrop-blur-md transition hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold text-cs-text">
                2. Context-Aware Learning Engine (CLE)
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cs-textSoft">
                AI diagnostik real-time yang membaca status sensor fisik sirkuit, mendeteksi pola miskonsepsi, dan memberikan scaffolding adaptif.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-sky-600">
                <Link href="/cle" className="flex items-center gap-1 hover:underline">
                  Uji Mesin CLE <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 3. Voice & Tactile Multimodal Interaction */}
            <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-lg backdrop-blur-md transition hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Volume2 className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold text-cs-text">
                3. Voice & Tactile Multimodal
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cs-textSoft">
                Antarmuka suara dwiarah dan kosakata taktil khusus (raba, rasakan, temukan) tanpa istilah visual bias seperti "lihat gambar".
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-600">
                <Link href="/tutor" className="flex items-center gap-1 hover:underline">
                  Coba AI Assistant <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 4. Tripartite Learning Analytics */}
            <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-lg backdrop-blur-md transition hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold text-cs-text">
                4. Tripartite Learning Analytics
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cs-textSoft">
                Dasbor tiga peran (Siswa, Guru, Orang Tua) mengukur skor kemandirian, pola kesalahan kelas, dan rekomendasi intervensi pedagogis.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-amber-600">
                <Link href="/teacher" className="flex items-center gap-1 hover:underline">
                  Buka Dasbor Guru <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 5. Digital Tactile Handbook */}
            <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-lg backdrop-blur-md transition hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold text-cs-text">
                5. Digital Tactile Handbook
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cs-textSoft">
                Buku panduan kurikulum IPA SMPLB 4 bab terintegrasi dengan pemutar audio teks-ke-suara dan representasi Braille digital.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-purple-700">
                <Link href="/handbook" className="flex items-center gap-1 hover:underline">
                  Pelajari Bab 1-4 <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 6. WCAG 2.1 AAA Accessibility */}
            <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-lg backdrop-blur-md transition hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold text-cs-text">
                Standar Aksesibilitas Tertinggi
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cs-textSoft">
                Dilengkapi tema kontras tinggi ramah Low Vision (Kuning di atas Hitam), pintasan keyboard Alt+1..7, dan pembaca layar otomatis.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-rose-600">
                <button
                  onClick={() => {
                    const event = new KeyboardEvent("keydown", { key: "a", altKey: true });
                    window.dispatchEvent(event);
                  }}
                  className="flex items-center gap-1 hover:underline"
                >
                  Buka Pengaturan (Alt+A) <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* AI ENGINE PIPELINE FLOW                                                  */}
      {/* ========================================================================= */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-xs font-extrabold uppercase tracking-widest text-cs-primaryDeep">
              Arsitektur Sistem
            </h2>
            <p className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-cs-text sm:text-4xl">
              Alur Kerja Context-Aware Learning Engine
            </p>
            <p className="mt-3 text-base text-cs-textSoft">
              Bagaimana AI memahami status fisik papan praktikum dan membimbing siswa tanpa langsung membocorkan jawaban.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {/* Step 1 */}
            <div className="card relative rounded-2xl border border-white/80 bg-white/80 p-5 shadow-md backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-600">Langkah 01</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-xs font-bold text-purple-700">
                  1
                </span>
              </div>
              <h4 className="mt-3 font-heading text-sm font-extrabold text-cs-text">
                Papan Taktil & Sensor
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-cs-textSoft">
                Siswa meraba dan menyusun balok komponen. Kamera/ESP32 membaca posisi marker ArUco dan kontinuitas sirkuit.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card relative rounded-2xl border border-white/80 bg-white/80 p-5 shadow-md backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-sky-600">Langkah 02</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-xs font-bold text-sky-700">
                  2
                </span>
              </div>
              <h4 className="mt-3 font-heading text-sm font-extrabold text-cs-text">
                Telemetri ke CLE Engine
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-cs-textSoft">
                Data topologi dianalisis: tegangan, polaritas, dan keterhubungan loop rangkaian (latency &lt; 50ms).
              </p>
            </div>

            {/* Step 3 */}
            <div className="card relative rounded-2xl border border-white/80 bg-white/80 p-5 shadow-md backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-600">Langkah 03</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-700">
                  3
                </span>
              </div>
              <h4 className="mt-3 font-heading text-sm font-extrabold text-cs-text">
                Explain Before Answer
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-cs-textSoft">
                AI tidak langsung membetulkan. AI memberikan pertanyaan reflektif: *"Coba raba tonjolan kutub baterai..."*
              </p>
            </div>

            {/* Step 4 */}
            <div className="card relative rounded-2xl border border-white/80 bg-white/80 p-5 shadow-md backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-600">Langkah 04</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-xs font-bold text-amber-700">
                  4
                </span>
              </div>
              <h4 className="mt-3 font-heading text-sm font-extrabold text-cs-text">
                Umpan Balik Multimodal
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-cs-textSoft">
                Suara sintesis bahasa Indonesia membacakan petunjuk, dilengkapi audio haptik saat rangkaian berhasil terhubung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3 USER ROLE PORTALS ACCESS                                                */}
      {/* ========================================================================= */}
      <section className="relative border-t border-purple-100 bg-white/80 py-20 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-xs font-extrabold uppercase tracking-widest text-cs-primaryDeep">
              Ekosistem Terpadu Tiga Peran
            </h2>
            <p className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-cs-text sm:text-4xl">
              Pilih Portal Akses Pengguna
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Student Card */}
            <Link
              href="/student"
              className="card group rounded-3xl border border-purple-200 bg-gradient-to-b from-purple-50/50 to-white p-6 shadow-lg transition hover:border-cs-primaryDeep hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-extrabold text-cs-text">
                Portal Peserta Didik
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-cs-textSoft">
                Akses level praktikum mandiri, peta keterampilan (Skill Map), radar penguasaan konsep, dan lencana gamifikasi inklusif.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-purple-100 pt-4 text-xs font-bold text-cs-primaryDeep">
                <span>Buka Dashboard Siswa</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Teacher Card */}
            <Link
              href="/teacher"
              className="card group rounded-3xl border border-blue-200 bg-gradient-to-b from-blue-50/50 to-white p-6 shadow-lg transition hover:border-blue-600 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-extrabold text-cs-text">
                Portal Guru & Pengajar
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-cs-textSoft">
                Pantau grafik penguasaan kelas (Recharts), matriks miskonsepsi siswa, pola kesalahan umum, dan skor kemandirian.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-blue-100 pt-4 text-xs font-bold text-blue-600">
                <span>Buka Dashboard Guru</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Parent Card */}
            <Link
              href="/parent"
              className="card group rounded-3xl border border-emerald-200 bg-gradient-to-b from-emerald-50/50 to-white p-6 shadow-lg transition hover:border-emerald-600 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-extrabold text-cs-text">
                Portal Orang Tua
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-cs-textSoft">
                Ringkasan durasi belajar anak, lencana pencapaian, panduan mendampingi praktikum sains di rumah, dan Tanya AI Parenting.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-emerald-100 pt-4 text-xs font-bold text-emerald-600">
                <span>Buka Dashboard Orang Tua</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <footer className="border-t border-gray-200 bg-white px-4 py-12 text-center text-xs text-cs-textSoft sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <img src="/logo-lentera.png" alt="" className="h-6 w-6 rounded-lg" />
            <span className="font-heading font-extrabold text-cs-text">LENTERA Ecosystem</span>
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700">
              LIDM 2026 Ready
            </span>
          </div>

          <p>
            Dirancang untuk Divisi Inovasi Teknologi Digital Pendidikan — Lomba Inovasi Digital Mahasiswa (LIDM).
          </p>

          <div className="flex items-center gap-4 font-bold text-cs-primaryDeep">
            <Link href="/cle" className="hover:underline">Lab CLE</Link>
            <Link href="/tutor" className="hover:underline">AI Assistant</Link>
            <Link href="/handbook" className="hover:underline">Handbook</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
