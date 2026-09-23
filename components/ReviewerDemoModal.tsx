"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Play, Cpu,
  Bot, GraduationCap, Users, X, Layers, Clock, ShieldCheck, Volume2
} from "lucide-react";

interface ReviewerDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewerDemoModal({ isOpen, onClose }: ReviewerDemoModalProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);

  if (!isOpen) return null;

  const steps = [
    {
      num: 1,
      title: "Telemetri Sensor: Skenario Lampu Terbalik",
      tag: "Hardware / Simulation",
      time: "Menit 01:00",
      targetUrl: "/cle",
      desc: "Menunjukkan data telemetri papan: Baterai 3.0V (Connected), Saklar (Closed), Lampu (Wrong Polarity). Data source transparan.",
      keyEvidence: "Sensor membaca impedansi terbalik pada dudukan LED di kisi B1/D1.",
    },
    {
      num: 2,
      title: "CLE Cognitive Reasoning Trace",
      tag: "Core AI Engine",
      time: "Menit 02:00",
      targetUrl: "/cle",
      desc: "Audit penalaran AI: Connectivity Check (OK) → Polarity Bias Check (FAIL) → Misconception Matching (97.4%) → Decision: Inverted Assembly.",
      keyEvidence: "Algoritma rule-based & LLaMA 3.3 inferensi menghasilkan diagnosa dalam 92ms.",
    },
    {
      num: 3,
      title: "Explain Before Answer & Voice AI Tutor",
      tag: "Socratic Scaffolding",
      time: "Menit 03:00",
      targetUrl: "/tutor",
      desc: "AI tidak membocorkan kunci jawaban. Memberi petunjuk rabaan: 'Coba raba tanda positif dan negatif pada dudukan lampu'. Kosakata 100% taktil bebas bias visual.",
      keyEvidence: "Uji suara dwiarah mikrofon dan pembacaan teks otomatis bahasa Indonesia.",
    },
    {
      num: 4,
      title: "Tripartite Analytics & Intervensi Guru",
      tag: "Learning Analytics",
      time: "Menit 04:00",
      targetUrl: "/teacher",
      desc: "Dasbor Guru mendeteksi pola: '5 siswa mengalami pola kesalahan polaritas'. Dasbor Siswa memetakan Cognitive Diagnosis Radar 72%.",
      keyEvidence: "Recharts grafik tren kelas dan intervensi bimbingan taktil satu-klik.",
    },
  ];

  const activeStepData = steps[currentStep - 1];

  const handleLaunchStep = () => {
    onClose();
    router.push(activeStepData.targetUrl);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md transition-all"
      role="dialog"
      aria-modal="true"
      aria-label="Mode Presentasi Juri LIDM"
    >
      <div className="card relative w-full max-w-2xl rounded-3xl border-2 border-purple-400 bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white shadow-md">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-lg font-black text-cs-text">
                  Demo LIDM Mode (5-Minute Reviewer Flow)
                </h3>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  Auto Setup Aktif
                </span>
              </div>
              <p className="text-xs text-cs-textSoft">
                Alur presentasi terstruktur 5 menit untuk pengujian dewan juri kompetisi nasional
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 4 Steps Timeline Tabs */}
        <div className="mt-6 grid grid-cols-4 gap-2">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`flex flex-col items-center rounded-2xl border p-2.5 text-center transition ${
                currentStep === s.num
                  ? "border-cs-primaryDeep bg-purple-100/80 ring-2 ring-cs-primaryDeep"
                  : "border-gray-200 bg-gray-50/70 hover:bg-white"
              }`}
            >
              <span className="font-mono text-[10px] font-bold text-purple-700">Tahap {s.num}</span>
              <span className="mt-1 font-heading text-[11px] font-extrabold text-cs-text line-clamp-1">
                {s.tag}
              </span>
              <span className="text-[9px] text-cs-textSoft">{s.time}</span>
            </button>
          ))}
        </div>

        {/* Active Step Showcase Card */}
        <div className="mt-6 rounded-2xl border border-purple-200 bg-purple-50/50 p-5">
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-purple-200 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-purple-900">
              {activeStepData.tag} · {activeStepData.time}
            </span>
            <span className="text-xs font-mono font-bold text-cs-primaryDeep">
              Langkah {currentStep} dari 4
            </span>
          </div>

          <h4 className="mt-2 font-heading text-lg font-black text-cs-text">
            {activeStepData.title}
          </h4>

          <p className="mt-2 text-xs leading-relaxed text-cs-text">
            {activeStepData.desc}
          </p>

          <div className="mt-3 flex items-start gap-2 rounded-xl bg-white p-3 border border-purple-100 text-xs">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-cs-text">Bukti Pengujian Juri:</strong>{" "}
              <span className="text-cs-textSoft">{activeStepData.keyEvidence}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-bold text-cs-text hover:bg-gray-100"
              >
                ← Sebelumnya
              </button>
            )}
            {currentStep < 4 && (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="rounded-xl border border-purple-200 bg-purple-50 px-3 py-2 text-xs font-bold text-cs-primaryDeep hover:bg-purple-100"
              >
                Langkah Berikutnya →
              </button>
            )}
          </div>

          <button
            onClick={handleLaunchStep}
            className="flex items-center gap-2 rounded-2xl bg-cs-primaryDeep px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-500/25 hover:bg-cs-primaryHover"
          >
            <span>Buka Halaman {activeStepData.targetUrl}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
