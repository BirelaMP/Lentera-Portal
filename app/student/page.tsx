"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap, Trophy, Award, Flame, Star, Sparkles, ArrowRight,
  Play, BookOpen, Cpu, CheckCircle2, TrendingUp, Compass, Volume2,
  Lock, Calendar, Clock, RotateCcw
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, Tooltip
} from "recharts";

const SKILL_DATA = [
  { subject: "Komponen Dasar", score: 95, stars: 5, status: "Kuasai Sempurna" },
  { subject: "Rangkaian Seri", score: 88, stars: 4, status: "Sangat Baik" },
  { subject: "Polaritas Listrik", score: 70, stars: 3, status: "Perlu Latihan" },
  { subject: "Rangkaian Paralel", score: 55, stars: 2, status: "Terkunci / Baru" },
  { subject: "Analisis Masalah", score: 75, stars: 3, status: "Berkembang" },
  { subject: "Keselamatan Kerja", score: 92, stars: 5, status: "Kuasai Sempurna" },
];

const WEEKLY_XP = [
  { day: "Sen", xp: 120 },
  { day: "Sel", xp: 180 },
  { day: "Rab", xp: 150 },
  { day: "Kam", xp: 240 },
  { day: "Jum", xp: 210 },
  { day: "Sab", xp: 320 },
  { day: "Min", xp: 280 },
];

const ACHIEVEMENTS = [
  { id: "a1", title: "Sentuhan Pertama", desc: "Mengenali 4 balok komponen taktil tanpa kesalahan", icon: "✋", unlocked: true },
  { id: "a2", title: "Master Rangkaian Seri", desc: "Menyelesaikan 5 praktikum seri mandiri", icon: "⚡", unlocked: true },
  { id: "a3", title: "Detektif Polaritas", desc: "Memperbaiki orientasi anoda/katoda dengan bimbingan CLE", icon: "🔍", unlocked: true },
  { id: "a4", title: "Arsitek Paralel", desc: "Menyusun sirkuit 2 cabang stabil", icon: "🌐", unlocked: false },
  { id: "a5", title: "100% Mandiri", desc: "Menyelesaikan asesmen tanpa hint bantuan AI", icon: "👑", unlocked: false },
];

export default function StudentDashboard() {
  const [isSpeakingProgress, setIsSpeakingProgress] = useState(false);

  const speakStudentOverview = () => {
    if (!("speechSynthesis" in window)) return;
    if (isSpeakingProgress) {
      window.speechSynthesis.cancel();
      setIsSpeakingProgress(false);
      return;
    }

    const text =
      "Halo Farhan Pratama. Anda saat ini berada di Level 2: Rangkaian Seri dengan progres tujuh puluh dua persen. Rekomendasi latihan berikutnya dari AI adalah: Memahami hubungan tegangan dan arus saat menambah beban secara seri. Anda memiliki streak belajar 5 hari berturut-turut.";

    window.speechSynthesis.cancel();
    setIsSpeakingProgress(true);
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "id-ID";
    utter.rate = parseFloat(localStorage.getItem("lentera_speech_rate") || "1.0");
    utter.onend = () => setIsSpeakingProgress(false);
    utter.onerror = () => setIsSpeakingProgress(false);
    window.speechSynthesis.speak(utter);
  };

  return (
    <main className="min-h-screen bg-cs-bg px-4 py-8 font-body text-cs-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Profile & Header Card */}
        <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-md backdrop-blur-md">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-2xl font-black text-white shadow-lg shadow-purple-500/30">
                FP
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs text-white ring-2 ring-white">
                  ✓
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading text-2xl font-black text-cs-text">
                    Farhan Pratama
                  </h1>
                  <span className="rounded-full bg-purple-100 px-3 py-0.5 text-xs font-bold text-cs-primaryDeep">
                    SMPLB Inklusi Kelas 8
                  </span>
                </div>
                <p className="mt-1 text-xs text-cs-textSoft">
                  Jalur Belajar: <strong>Sains Fisika & Kelistrikan Adaptif</strong> · Pembaca Layar Aktif
                </p>
              </div>
            </div>

            {/* Quick Stats Pill Group */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-2 border border-amber-200">
                <Flame className="h-5 w-5 text-amber-500 fill-amber-500" />
                <div>
                  <div className="text-[10px] font-bold text-amber-800">Streak Belajar</div>
                  <div className="font-heading text-sm font-extrabold text-amber-950">5 Hari Berturut</div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-2xl bg-purple-50 px-4 py-2 border border-purple-200">
                <Trophy className="h-5 w-5 text-cs-primaryDeep" />
                <div>
                  <div className="text-[10px] font-bold text-purple-800">Total Pengalaman</div>
                  <div className="font-heading text-sm font-extrabold text-purple-950">1.480 XP</div>
                </div>
              </div>

              <button
                onClick={speakStudentOverview}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold shadow-sm transition ${
                  isSpeakingProgress
                    ? "bg-amber-400 text-black animate-pulse"
                    : "bg-cs-primaryDeep text-white hover:bg-cs-primaryHover"
                }`}
              >
                <Volume2 className="h-4 w-4" />
                <span>{isSpeakingProgress ? "Membaca..." : "Dengarkan Dasbor"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 1: Practical Level & AI Recommendation */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Level & Progress Ring (Task 5 requirement) */}
          <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-md backdrop-blur-md lg:col-span-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-cs-primaryDeep">
                Practical Level
              </span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                Sedang Aktif
              </span>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center text-center">
              {/* Progress Ring Visual */}
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-tr from-purple-100 to-indigo-50">
                <div
                  className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white shadow-inner"
                  style={{
                    boxShadow: "0 0 0 8px rgba(124, 58, 237, 0.15)",
                  }}
                >
                  <span className="font-heading text-3xl font-black text-cs-primaryDeep">72%</span>
                  <span className="text-[10px] font-bold text-cs-textSoft">Penguasaan</span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-heading text-lg font-black text-cs-text">
                  Level 2: Series Circuit (Rangkaian Seri)
                </h3>
                <p className="mt-1 text-xs text-cs-textSoft max-w-xs">
                  Kamu telah menyelesaikan 7 dari 10 modul praktikum taktil rangkaian seri.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 w-full">
                <div className="flex justify-between text-[11px] font-bold text-cs-textSoft">
                  <span>Progres Modul</span>
                  <span>72%</span>
                </div>
                <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-purple-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-1000"
                    style={{ width: "72%" }}
                  />
                </div>
              </div>

              <div className="mt-5 flex w-full justify-between rounded-xl bg-gray-50 p-3 text-xs">
                <div>
                  <div className="text-[10px] text-cs-textSoft">Level Berikutnya</div>
                  <div className="font-bold text-cs-text">Level 3: Rangkaian Paralel</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-cs-textSoft">Sisa Tugas</div>
                  <div className="font-bold text-cs-primaryDeep">3 Praktikum lagi</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendation Card (Task 5 requirement) */}
          <div className="card flex flex-col justify-between rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/60 p-6 shadow-lg backdrop-blur-md lg:col-span-7">
            <div>
              <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-white shadow-xs">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-heading text-sm font-extrabold text-cs-text">
                      AI Adaptive Recommendation
                    </h3>
                    <p className="text-[10px] text-cs-textSoft">Dihasilkan oleh Context-Aware Engine</p>
                  </div>
                </div>
                <span className="rounded-full bg-purple-200/80 px-3 py-1 text-[11px] font-bold text-purple-900">
                  Personalisasi Farhan
                </span>
              </div>

              <div className="mt-5 rounded-2xl bg-white p-5 border border-purple-100 shadow-xs">
                <div className="text-xs font-extrabold uppercase tracking-wider text-cs-primaryDeep">
                  Latihan Berikutnya:
                </div>
                <h4 className="mt-1 font-heading text-xl font-black text-cs-text">
                  "Memahami hubungan tegangan dan arus saat menambah beban secara seri."
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-cs-textSoft">
                  Berdasarkan telemetri sesi kemarin, kamu sudah sangat mahir merakit saklar dan baterai. Tahap selanjutnya adalah menyelidiki mengapa nyala lampu kedua menjadi lebih redup jika dipasang berdampingan dalam satu jalur seri.
                </p>

                {/* Tactile Learning Tip */}
                <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-purple-50/70 p-3 text-xs text-purple-900">
                  <Compass className="h-4 w-4 text-cs-primaryDeep shrink-0 mt-0.5" />
                  <div>
                    <strong>Instruksi Taktil:</strong> Siapkan dua balok lampu taktil dan raba tanda timbul pada soket sebelum memasang ke kisi D1 dan B1.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-purple-100 pt-4">
              <Link
                href="/cle"
                className="flex items-center gap-2 rounded-2xl bg-cs-primaryDeep px-6 py-3 text-xs font-bold text-white shadow-md shadow-purple-500/25 transition hover:bg-cs-primaryHover"
              >
                <Cpu className="h-4 w-4" />
                <span>Mulai Simulasi Praktikum di Lab CLE</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/handbook#ch2"
                className="flex items-center gap-1.5 text-xs font-bold text-cs-primaryDeep hover:underline"
              >
                <BookOpen className="h-4 w-4" />
                <span>Baca Bab 2 Rangkaian Seri</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Row 2: Skill Map (Cognitive Diagnosis) & Achievements */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Skill Map with Recharts Radar */}
          <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-md backdrop-blur-md lg:col-span-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-heading text-base font-extrabold text-cs-text">
                  Skill Map (Cognitive Diagnosis)
                </h3>
                <p className="text-xs text-cs-textSoft">Pemetaan 6 dimensi kompetensi sains inklusif</p>
              </div>
              <span className="font-mono text-xs font-bold text-cs-primaryDeep">6/6 Terbaca</span>
            </div>

            {/* Radar Chart */}
            <div className="my-2 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={SKILL_DATA}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#2E2A5E", fontSize: 11, fontWeight: 700 }} />
                  <Radar name="Penguasaan" dataKey="score" stroke="#7C3AED" fill="#8B5CF6" fillOpacity={0.45} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Star Rating Breakdown List */}
            <div className="mt-4 space-y-2.5">
              {SKILL_DATA.map((item) => (
                <div key={item.subject} className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-cs-text">{item.subject}</span>
                  <div className="flex items-center gap-3">
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < item.stars ? "fill-amber-400 text-amber-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="w-10 text-right font-mono font-bold text-cs-primaryDeep">
                      {item.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges & Activity Trend */}
          <div className="space-y-6 lg:col-span-6">
            {/* Achievement Badges */}
            <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-md backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  <h3 className="font-heading text-base font-extrabold text-cs-text">
                    Lencana Pencapaian (Achievements)
                  </h3>
                </div>
                <span className="text-xs font-bold text-cs-primaryDeep">3 dari 5 Dibuka</span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {ACHIEVEMENTS.map((ach) => (
                  <div
                    key={ach.id}
                    className={`flex items-start gap-3 rounded-2xl border p-3.5 transition ${
                      ach.unlocked
                        ? "border-amber-200 bg-amber-50/50 shadow-xs"
                        : "border-gray-200 bg-gray-50/70 opacity-60"
                    }`}
                  >
                    <span className="text-2xl">{ach.icon}</span>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-heading text-xs font-extrabold text-cs-text">
                          {ach.title}
                        </span>
                        {!ach.unlocked && <Lock className="h-3 w-3 text-gray-400" />}
                      </div>
                      <p className="mt-0.5 text-[11px] leading-tight text-cs-textSoft">
                        {ach.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly XP Trend AreaChart */}
            <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-md backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="font-heading text-sm font-extrabold text-cs-text">
                    Aktivitas Praktikum Mingguan
                  </h3>
                  <p className="text-[10px] text-cs-textSoft">Akumulasi XP praktikum mandiri</p>
                </div>
                <span className="font-heading text-xs font-extrabold text-emerald-600">+42% Minggu Ini</span>
              </div>
              <div className="mt-4 h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={WEEKLY_XP}>
                    <defs>
                      <linearGradient id="colorXP" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} />
                    <Tooltip />
                    <Area type="monotone" dataKey="xp" stroke="#7C3AED" strokeWidth={2.5} fill="url(#colorXP)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
