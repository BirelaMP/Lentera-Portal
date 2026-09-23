"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HeartHandshake, Heart, Clock, Award, Sparkles, Send, Volume2,
  Calendar, CheckCircle2, BookOpen, Compass, ChevronRight, MessageSquare
} from "lucide-react";

export default function ParentDashboard() {
  const [parentQuestion, setParentQuestion] = useState("");
  const [parentChatHistory, setParentChatHistory] = useState([
    {
      role: "ai",
      text: "Halo Ayah/Bunda! Saya LENTERA AI Parenting Assistant. Farhan menunjukkan kemajuan luar biasa dalam meraba dan menyusun rangkaian seri pekan ini. Apa yang ingin Ayah/Bunda ketahui seputar pendampingan sains di rumah?",
    },
  ]);
  const [isAsking, setIsAsking] = useState(false);
  const [isSpeakingParent, setIsSpeakingParent] = useState(false);

  const speakParentOverview = () => {
    if (!("speechSynthesis" in window)) return;
    if (isSpeakingParent) {
      window.speechSynthesis.cancel();
      setIsSpeakingParent(false);
      return;
    }

    const text =
      "Selamat datang di Dasbor Orang Tua LENTERA. Ananda Farhan telah menyelesaikan 4 jam 15 menit praktikum sains pekan ini dengan tingkat kemandirian delapan puluh delapan persen. Farhan baru saja meraih lencana Detektif Polaritas.";

    window.speechSynthesis.cancel();
    setIsSpeakingParent(true);
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "id-ID";
    utter.rate = parseFloat(localStorage.getItem("lentera_speech_rate") || "1.0");
    utter.onend = () => setIsSpeakingParent(false);
    utter.onerror = () => setIsSpeakingParent(false);
    window.speechSynthesis.speak(utter);
  };

  const handleParentAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentQuestion.trim() || isAsking) return;

    const q = parentQuestion.trim();
    setParentChatHistory((prev) => [...prev, { role: "user", text: q }]);
    setParentQuestion("");
    setIsAsking(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Pertanyaan dari orang tua peserta didik tunanetra: ${q}`,
          mode: "exploration",
        }),
      });
      const data = await res.json();
      setParentChatHistory((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data.text ||
            "Bagus sekali perhatian Ayah/Bunda. Di rumah, Ayah/Bunda bisa mengajak Farhan meraba peralatan listrik aman seperti saklar lampu dinding atau senter untuk menguatkan konsep yang dipelajarinya di sekolah.",
        },
      ]);
    } catch (err) {
      setParentChatHistory((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "Untuk merangsang rasa ingin tahu Farhan, cobalah ajak ia meraba baterai jam dinding dan temukan sisi kutub positif yang menonjol bersama-sama.",
        },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <main className="min-h-screen bg-cs-bg px-4 py-8 font-body text-cs-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <HeartHandshake className="h-3.5 w-3.5" />
              <span>Parent Monitoring Portal — LIDM 2026</span>
            </div>
            <h1 className="mt-2 font-heading text-3xl font-black text-cs-text sm:text-4xl">
              Dasbor Pemantauan Orang Tua
            </h1>
            <p className="mt-1 text-sm text-cs-textSoft">
              Pantau perkembangan praktikum sains inklusif ananda <strong>Farhan Pratama</strong> dan dapatkan panduan pendampingan taktil di rumah.
            </p>
          </div>

          <button
            onClick={speakParentOverview}
            className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold shadow-md transition ${
              isSpeakingParent
                ? "bg-amber-400 text-black animate-pulse"
                : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/25"
            }`}
          >
            <Volume2 className="h-4 w-4" />
            <span>{isSpeakingParent ? "Membaca..." : "Dengarkan Ringkasan Suara"}</span>
          </button>
        </div>

        {/* Activity Summary Cards (Task 7 requirement) */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="card rounded-3xl border border-white/80 bg-white/90 p-5 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-2 text-cs-textSoft">
              <Clock className="h-4 w-4 text-emerald-600" />
              <span className="text-[11px] font-bold">Waktu Praktikum Pekan Ini</span>
            </div>
            <div className="mt-2 font-heading text-2xl font-black text-cs-text">4 Jam 15 Mnt</div>
            <div className="mt-1 text-[11px] font-bold text-emerald-600">Sangat Konsisten</div>
          </div>

          <div className="card rounded-3xl border border-white/80 bg-white/90 p-5 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-2 text-cs-textSoft">
              <CheckCircle2 className="h-4 w-4 text-purple-600" />
              <span className="text-[11px] font-bold">Sesi Praktikum Selesai</span>
            </div>
            <div className="mt-2 font-heading text-2xl font-black text-cs-primaryDeep">7 Sesi</div>
            <div className="mt-1 text-[11px] font-bold text-purple-700">Rangkaian Seri & Polaritas</div>
          </div>

          <div className="card rounded-3xl border border-white/80 bg-white/90 p-5 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-2 text-cs-textSoft">
              <Award className="h-4 w-4 text-amber-600" />
              <span className="text-[11px] font-bold">Skor Kemandirian Anak</span>
            </div>
            <div className="mt-2 font-heading text-2xl font-black text-amber-600">88%</div>
            <div className="mt-1 text-[11px] font-bold text-amber-700">↑ Meningkat dari 65%</div>
          </div>

          <div className="card rounded-3xl border border-white/80 bg-white/90 p-5 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-2 text-cs-textSoft">
              <Sparkles className="h-4 w-4 text-sky-600" />
              <span className="text-[11px] font-bold">Bantuan AI Dibutuhkan</span>
            </div>
            <div className="mt-2 font-heading text-2xl font-black text-sky-600">Hanya 12%</div>
            <div className="mt-1 text-[11px] font-bold text-sky-700">Mampu koreksi mandiri</div>
          </div>
        </div>

        {/* Row 2: Achievements & AI Recommendations for Parents */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Achievements Showcase (Task 7 requirement) */}
          <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-md backdrop-blur-md lg:col-span-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                <h3 className="font-heading text-base font-extrabold text-cs-text">
                  Lencana & Prestasi Ananda
                </h3>
              </div>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-900">
                Pencapaian Aktif
              </span>
            </div>

            <div className="mt-4 space-y-3.5">
              <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50/60 p-3.5">
                <span className="text-2xl">🔍</span>
                <div>
                  <div className="font-heading text-xs font-bold text-cs-text">Detektif Polaritas</div>
                  <div className="text-[11px] text-cs-textSoft">
                    Farhan berhasil membedakan anoda dan katoda melalui sentuhan fisik tanda timbul.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-purple-200 bg-purple-50/60 p-3.5">
                <span className="text-2xl">⚡</span>
                <div>
                  <div className="font-heading text-xs font-bold text-cs-text">Master Rangkaian Seri</div>
                  <div className="text-[11px] text-cs-textSoft">
                    Menyelesaikan perakitan baterai, saklar, dan lampu dalam 1 loop tanpa putus.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5">
                <span className="text-2xl">✋</span>
                <div>
                  <div className="font-heading text-xs font-bold text-cs-text">Sentuhan Pertama</div>
                  <div className="text-[11px] text-cs-textSoft">
                    Mengenal seluruh komponen pada Smart Tactile Board dengan percaya diri.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendation for Parents (Task 7 requirement) */}
          <div className="card rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-white to-purple-50/40 p-6 shadow-md backdrop-blur-md lg:col-span-7">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-emerald-600 fill-emerald-600" />
                <h3 className="font-heading text-base font-extrabold text-cs-text">
                  Rekomendasi Pendampingan di Rumah
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-700">Tips AI Khusus Tunanetra</span>
            </div>

            <div className="mt-4 space-y-3.5 text-xs text-cs-text">
              <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-xs">
                <div className="font-heading text-xs font-bold text-emerald-900">
                  1. Eksperimen Taktil Sendok Logam & Baterai Senter
                </div>
                <p className="mt-1 leading-relaxed text-cs-textSoft">
                  Ajak Farhan menyentuh permukaan baterai senter di rumah dan mendiskusikan kenapa ada ujung yang menonjol dan ujung yang datar. Ini memperkuat konsep polaritas yang dipelajarinya di sekolah.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-xs">
                <div className="font-heading text-xs font-bold text-emerald-900">
                  2. Pertanyaan Pemicu Refleksi di Meja Makan
                </div>
                <p className="mt-1 leading-relaxed text-cs-textSoft">
                  <em>"Farhan, kalau saklar lampu di kamar ditekan, apa yang terjadi pada jembatan arus listrik di dalamnya?"</em> Biarkan Farhan menjelaskan analogi saklar dengan kata-katanya sendiri.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-xs">
                <div className="font-heading text-xs font-bold text-emerald-900">
                  3. Penguatan Kosakata Sentuhan
                </div>
                <p className="mt-1 leading-relaxed text-cs-textSoft">
                  Hindari mengatakan "lihat lampu ini menyala". Gunakan "rasakan kehangatan bohlam ini" atau "dengarkan bunyi klik saklar ini".
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Focus 4: Home Learning Activity (Latihan Mandiri Taktil di Rumah) */}
        <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-md backdrop-blur-md">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Compass className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-heading text-base font-extrabold text-cs-text">
                  Home Learning Activity (Latihan Mandiri Taktil di Rumah)
                </h3>
                <p className="text-xs text-cs-textSoft">
                  Stimulasi sains praktis menggunakan benda rumah tangga untuk memperkuat hasil belajar di sekolah
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                Progres: 2 dari 3 Selesai (67%)
              </span>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              {
                id: "h1",
                day: "Latihan Kemarin",
                title: "Raba Kutub Baterai Jam Dinding",
                desc: "Membedakan tonjolan positif (+) dan permukaan rata (-) pada baterai AA/AAA.",
                done: true,
                tip: "Farhan berhasil mengenali kutub dalam 10 detik.",
              },
              {
                id: "h2",
                day: "Latihan Hari Ini",
                title: "Bunyi Klik Saklar Lampu Meja",
                desc: "Merasakan perbedaan posisi tuas saat sirkuit tertutup (ON) dan terbuka (OFF).",
                done: true,
                tip: "Memperkuat konsep kontinuitas sirkuit seri.",
              },
              {
                id: "h3",
                day: "Tantangan Besok",
                title: "Menelusuri Kabel Tanpa Cabang",
                desc: "Gunakan ujung jari menelusuri kabel dari steker ke lampu tidur sebagai analogi loop tunggal.",
                done: false,
                tip: "Persiapan sebelum masuk ke konsep rangkaian paralel.",
              },
            ].map((ex) => (
              <div
                key={ex.id}
                className={`rounded-2xl border p-4 transition ${
                  ex.done
                    ? "border-emerald-200 bg-emerald-50/50 shadow-xs"
                    : "border-purple-200 bg-purple-50/40"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span className={ex.done ? "text-emerald-700" : "text-cs-primaryDeep"}>
                    {ex.day}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.2 ${
                      ex.done ? "bg-emerald-200 text-emerald-900" : "bg-purple-200 text-purple-900"
                    }`}
                  >
                    {ex.done ? "Selesai ✓" : "Terkunci"}
                  </span>
                </div>

                <h4 className="mt-2 font-heading text-xs font-extrabold text-cs-text">
                  {ex.title}
                </h4>
                <p className="mt-1 text-[11px] leading-relaxed text-cs-textSoft">
                  {ex.desc}
                </p>

                <div className="mt-3 border-t border-gray-100 pt-2 text-[10px] text-cs-textSoft">
                  <strong>Catatan AI:</strong> {ex.tip}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-gray-50 p-3 text-xs text-cs-textSoft flex items-center justify-between">
            <span>
              💡 <strong>Rekomendasi AI untuk Ayah/Bunda:</strong> Berikan apresiasi spesifik pada ketelitian rabaan ujung jari Farhan saat menemukan tonjolan kutub positif baterai.
            </span>
            <button
              onClick={() => alert("Lencana 'Pendamping Hebat' terbuka untuk orang tua Farhan!")}
              className="text-xs font-bold text-emerald-700 hover:underline shrink-0 ml-3"
            >
              Klaim Apresiasi
            </button>
          </div>
        </div>

        {/* Consultation Section: Tanya AI Parenting */}
        <div className="card rounded-3xl border border-white/80 bg-white/90 p-6 shadow-md backdrop-blur-md">
          <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
            <MessageSquare className="h-5 w-5 text-emerald-600" />
            <div>
              <h3 className="font-heading text-base font-extrabold text-cs-text">
                Konsultasi AI Parenting: Sains Inklusif
              </h3>
              <p className="text-xs text-cs-textSoft">
                Tanyakan cara terbaik mendampingi pembelajaran sains anak berkebutuhan khusus tunanetra
              </p>
            </div>
          </div>

          {/* Chat history */}
          <div className="my-4 max-h-60 space-y-3 overflow-y-auto pr-2 cs-scroll text-xs">
            {parentChatHistory.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-3.5 ${
                  item.role === "user"
                    ? "ml-auto max-w-[80%] bg-emerald-600 text-white"
                    : "mr-auto max-w-[85%] border border-emerald-100 bg-emerald-50/60 text-cs-text"
                }`}
              >
                <div className="font-bold text-[10px] opacity-80 uppercase mb-1">
                  {item.role === "user" ? "Ayah / Bunda" : "LENTERA AI Parenting"}
                </div>
                <p className="leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Ask Input Form */}
          <form onSubmit={handleParentAsk} className="flex gap-2">
            <input
              type="text"
              value={parentQuestion}
              onChange={(e) => setParentQuestion(e.target.value)}
              placeholder="Contoh: Bagaimana cara menjelaskan rangkaian paralel kepada anak tunanetra?..."
              className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-xs text-cs-text focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <button
              type="submit"
              disabled={!parentQuestion.trim() || isAsking}
              className="flex items-center gap-1.5 rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50"
            >
              <span>{isAsking ? "Menjawab..." : "Tanya"}</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
