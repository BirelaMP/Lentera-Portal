"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users, TrendingUp, AlertTriangle, Brain, Sparkles, CheckCircle2,
  FileText, Filter, ArrowUpRight, Search, BarChart3, ShieldCheck,
  GraduationCap, Volume2
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, CartesianGrid, XAxis, YAxis,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";

const MASTERY_TREND = [
  { week: "Mgg 1", mastery: 48, independence: 55 },
  { week: "Mgg 2", mastery: 56, independence: 62 },
  { week: "Mgg 3", mastery: 64, independence: 70 },
  { week: "Mgg 4", mastery: 72, independence: 79 },
  { week: "Mgg 5", mastery: 78, independence: 84 },
  { week: "Mgg 6", mastery: 84, independence: 89 },
];

const ERROR_PATTERNS = [
  { pattern: "Polaritas Terbalik", count: 18, color: "#EF4444", pct: "42%" },
  { pattern: "Jalur Sirkuit Terputus", count: 12, color: "#F59E0B", pct: "28%" },
  { pattern: "Salah Cabang Paralel", count: 8, color: "#3B82F6", pct: "18%" },
  { pattern: "Hubungan Singkat (Bypass)", count: 5, color: "#8B5CF6", pct: "12%" },
];

const STUDENTS = [
  { id: "s1", name: "Farhan Pratama", level: "Level 2: Rangkaian Seri", progress: 72, independence: 88, status: "Aktif Baik", needFocus: "Polaritas LED" },
  { id: "s2", name: "Aisyah Zahra", level: "Level 3: Rangkaian Paralel", progress: 91, independence: 95, status: "Mandiri Unggul", needFocus: "Tidak ada" },
  { id: "s3", name: "Budi Santoso", level: "Level 1: Komponen Dasar", progress: 54, independence: 68, status: "Perlu Bimbingan", needFocus: "Saklar Terbuka" },
  { id: "s4", name: "Dimas Anggara", level: "Level 2: Rangkaian Seri", progress: 68, independence: 76, status: "Aktif Baik", needFocus: "Polaritas LED" },
  { id: "s5", name: "Nabila Putri", level: "Level 2: Rangkaian Seri", progress: 65, independence: 72, status: "Aktif Baik", needFocus: "Polaritas LED" },
  { id: "s6", name: "Rizky Ramadhan", level: "Level 2: Rangkaian Seri", progress: 70, independence: 80, status: "Aktif Baik", needFocus: "Polaritas LED" },
];

export default function TeacherDashboard() {
  const [filterQuery, setFilterQuery] = useState("");
  const [isSpeakingInsight, setIsSpeakingInsight] = useState(false);

  const filteredStudents = STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.level.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const speakTeacherSummary = () => {
    if (!("speechSynthesis" in window)) return;
    if (isSpeakingInsight) {
      window.speechSynthesis.cancel();
      setIsSpeakingInsight(false);
      return;
    }

    const text =
      "Laporan Analitik Pengajar LENTERA. Rata-rata penguasaan kelas saat ini 84%. AI Insight mendeteksi: 5 siswa mengalami pola kesalahan polaritas pada percobaan lampu LED. Rekomendasi: Berikan instruksi taktil tambahan pada orientasi kaki panjang dan pendek komponen.";

    window.speechSynthesis.cancel();
    setIsSpeakingInsight(true);
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "id-ID";
    utter.rate = parseFloat(localStorage.getItem("lentera_speech_rate") || "1.0");
    utter.onend = () => setIsSpeakingInsight(false);
    utter.onerror = () => setIsSpeakingInsight(false);
    window.speechSynthesis.speak(utter);
  };

  return (
    <main className="min-h-screen bg-cs-bg px-4 py-8 font-body text-cs-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-700">
              <Users className="h-3.5 w-3.5" />
              <span>Teacher Analytics Portal — LIDM 2026</span>
            </div>
            <h1 className="mt-2 font-heading text-3xl font-black text-cs-text sm:text-4xl">
              Teacher Analytics & Learning Diagnostics
            </h1>
            <p className="mt-1 text-sm text-cs-textSoft">
              Pemantauan pola kesalahan kelas, matriks miskonsepsi, dan skor kemandirian peserta didik tunanetra.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={speakTeacherSummary}
              className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold shadow-md transition ${
                isSpeakingInsight
                  ? "bg-amber-400 text-black animate-pulse"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/25"
              }`}
            >
              <Volume2 className="h-4 w-4" />
              <span>{isSpeakingInsight ? "Membaca..." : "Dengarkan AI Insight"}</span>
            </button>

            <Link
              href="/cle"
              className="flex items-center gap-2 rounded-2xl border border-blue-200 bg-white px-5 py-3 text-xs font-bold text-blue-700 shadow-xs hover:bg-blue-50"
            >
              <Brain className="h-4 w-4" />
              <span>Buka Lab Simulasi CLE</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="card rounded-3xl border border-white/80 bg-white/90 p-5 shadow-sm backdrop-blur-md">
            <span className="text-[11px] font-bold text-cs-textSoft">Total Siswa Inklusi</span>
            <div className="mt-1 font-heading text-2xl font-black text-cs-text">24 Siswa</div>
            <div className="mt-1 text-[11px] font-bold text-emerald-600">100% Aktif Pekan Ini</div>
          </div>

          <div className="card rounded-3xl border border-white/80 bg-white/90 p-5 shadow-sm backdrop-blur-md">
            <span className="text-[11px] font-bold text-cs-textSoft">Rata-rata Kemandirian</span>
            <div className="mt-1 font-heading text-2xl font-black text-cs-primaryDeep">84.6%</div>
            <div className="mt-1 text-[11px] font-bold text-emerald-600">↑ 14% dari Baseline</div>
          </div>

          <div className="card rounded-3xl border border-white/80 bg-white/90 p-5 shadow-sm backdrop-blur-md">
            <span className="text-[11px] font-bold text-cs-textSoft">Penguasaan Konsep Kelas</span>
            <div className="mt-1 font-heading text-2xl font-black text-blue-600">78.0%</div>
            <div className="mt-1 text-[11px] font-bold text-blue-600">Target Kurikulum: 75%</div>
          </div>

          <div className="card rounded-3xl border border-white/80 bg-white/90 p-5 shadow-sm backdrop-blur-md">
            <span className="text-[11px] font-bold text-cs-textSoft">Praktikum Selesai</span>
            <div className="mt-1 font-heading text-2xl font-black text-emerald-600">42 Sesi</div>
            <div className="mt-1 text-[11px] font-bold text-emerald-700">Rerata 1.75 sesi/siswa</div>
          </div>
        </div>

        {/* AI Insight Highlight Panel & AI Teaching Intervention */}
        <div className="card rounded-3xl border-2 border-amber-300 bg-gradient-to-r from-amber-50/90 via-white to-purple-50/70 p-6 shadow-md backdrop-blur-md">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-start gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
                <Sparkles className="h-6 w-6" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold uppercase text-amber-900">
                    Peringatan Pedagogis AI Terkini
                  </span>
                  <span className="text-xs font-semibold text-cs-textSoft">Berdasarkan 42 sesi praktikum telemetri</span>
                </div>
                <h3 className="mt-1 font-heading text-lg font-black text-cs-text">
                  "5 siswa mengalami pola kesalahan polaritas pada percobaan lampu LED."
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-cs-textSoft">
                  Siswa terpengaruh: <strong>Budi Santoso, Farhan Pratama, Dimas Anggara, Nabila Putri, Rizky Ramadhan</strong>.
                </p>

                {/* AI Teaching Recommendation Box */}
                <div className="mt-3.5 rounded-2xl border border-amber-300/80 bg-white/90 p-4 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900">
                    <Brain className="h-4 w-4 text-cs-primaryDeep" />
                    <span>AI Teaching Recommendation:</span>
                  </div>
                  <div className="mt-1 text-xs font-semibold text-cs-text">
                    <strong>Kasus Siswa Budi Santoso:</strong> Terdeteksi <em>Repeated polarity mistake</em> (3x berturut-turut pada soket LED).
                  </div>
                  <p className="mt-1 text-xs italic text-cs-textSoft">
                    "Peserta didik membutuhkan penguatan konsep orientasi kutub melalui tactile practice."
                  </p>

                  {/* Actionable Intervention Buttons */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => alert("Latihan Taktil Mandiri berhasil dikirim ke perangkat belajar Budi Santoso & Farhan.")}
                      className="rounded-xl bg-cs-primaryDeep px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-cs-primaryHover"
                    >
                      Kirim Latihan Taktil Khusus
                    </button>
                    <button
                      onClick={() => alert("Jadwal bimbingan rabaan fisik ditambahkan ke agenda guru.")}
                      className="rounded-xl border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-bold text-cs-primaryDeep hover:bg-purple-100"
                    >
                      Jadwalkan Remedial Sentuhan
                    </button>
                    <Link
                      href="/handbook#ch1"
                      className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-cs-textSoft hover:bg-gray-50"
                    >
                      Buka Panduan Braille
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-2">
              <Link
                href="/cle"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-blue-700"
              >
                Uji Coba Pola di Lab CLE
              </Link>
            </div>
          </div>
        </div>

        {/* Charts Row: Class Mastery Trend & Error Pattern Distribution (Recharts) */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Trend Chart */}
          <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-md backdrop-blur-md lg:col-span-7">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-heading text-base font-extrabold text-cs-text">
                  Class Mastery & Independence Trend
                </h3>
                <p className="text-xs text-cs-textSoft">Peningkatan penguasaan konsep dan skor kemandirian 6 pekan</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-purple-700">
                  <span className="h-2 w-2 rounded-full bg-purple-600" />
                  Penguasaan (%)
                </span>
                <span className="flex items-center gap-1.5 text-sky-600">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  Kemandirian (%)
                </span>
              </div>
            </div>

            <div className="mt-4 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MASTERY_TREND}>
                  <defs>
                    <linearGradient id="colorMastery" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorIndep" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="week" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} domain={[30, 100]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="mastery" stroke="#7C3AED" strokeWidth={3} fill="url(#colorMastery)" />
                  <Area type="monotone" dataKey="independence" stroke="#0284C7" strokeWidth={2.5} fill="url(#colorIndep)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Error Pattern BarChart */}
          <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-md backdrop-blur-md lg:col-span-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-heading text-base font-extrabold text-cs-text">
                  Pola Kesalahan Siswa (Error Pattern)
                </h3>
                <p className="text-xs text-cs-textSoft">Frekuensi insiden telemetri pada papan sirkuit</p>
              </div>
              <span className="font-mono text-xs font-bold text-rose-600">42 Insiden</span>
            </div>

            <div className="mt-4 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ERROR_PATTERNS} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" stroke="#94A3B8" fontSize={10} />
                  <YAxis dataKey="pattern" type="category" stroke="#2E2A5E" fontSize={11} width={120} tick={{ fontWeight: 700 }} />
                  <Tooltip />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                    {ERROR_PATTERNS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Student Progress Roster Table */}
        <div className="card overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-md backdrop-blur-md">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-heading text-base font-extrabold text-cs-text">
                Daftar Progres Praktikum Siswa
              </h3>
              <p className="text-xs text-cs-textSoft">Detail penguasaan level dan skor kemandirian per peserta didik</p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-1.5 text-xs">
              <Search className="h-4 w-4 text-cs-textSoft" />
              <input
                type="text"
                placeholder="Cari siswa atau level..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="bg-transparent text-cs-text focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-100 bg-gray-50/80 font-heading font-extrabold text-cs-textSoft uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Nama Siswa</th>
                  <th className="px-6 py-3.5">Level Praktikum</th>
                  <th className="px-6 py-3.5">Progres Modul</th>
                  <th className="px-6 py-3.5">Skor Kemandirian</th>
                  <th className="px-6 py-3.5">Fokus Bimbingan</th>
                  <th className="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-cs-text">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-purple-50/40 transition">
                    <td className="px-6 py-4 font-bold text-cs-text">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-xs font-bold text-cs-primaryDeep">
                          {s.name.slice(0, 1)}
                        </span>
                        <span>{s.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-cs-textSoft">{s.level}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 rounded-full bg-gray-200 overflow-hidden">
                          <div className="h-full bg-purple-600 rounded-full" style={{ width: `${s.progress}%` }} />
                        </div>
                        <span className="font-mono font-bold text-cs-primaryDeep">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                        {s.independence}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {s.needFocus === "Tidak ada" ? (
                        <span className="text-emerald-600 font-bold">Optimal</span>
                      ) : (
                        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900">
                          {s.needFocus}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href="/student"
                        className="inline-flex items-center gap-1 font-bold text-cs-primaryDeep hover:underline"
                      >
                        Detail <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
