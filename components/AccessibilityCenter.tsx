"use client";

import { useState, useEffect } from "react";
import { Eye, Sun, Moon, Volume2, Type, Keyboard, X, Sparkles, Check, Play, VolumeX } from "lucide-react";

export type ContrastTheme = "normal" | "yellow-black" | "dark-contrast" | "blue-contrast";
export type TextScale = "normal" | "large" | "xlarge";

interface AccessibilityCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessibilityCenter({ isOpen, onClose }: AccessibilityCenterProps) {
  const [theme, setTheme] = useState<ContrastTheme>("normal");
  const [scale, setScale] = useState<TextScale>("normal");
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSpeakingTest, setIsSpeakingTest] = useState<boolean>(false);

  // Load saved preferences
  useEffect(() => {
    const savedTheme = (localStorage.getItem("lentera_theme") as ContrastTheme) || "normal";
    const savedScale = (localStorage.getItem("lentera_scale") as TextScale) || "normal";
    const savedRate = parseFloat(localStorage.getItem("lentera_speech_rate") || "1.0");
    const savedSound = localStorage.getItem("lentera_sound") !== "false";

    setTheme(savedTheme);
    setScale(savedScale);
    setSpeechRate(savedRate);
    setSoundEnabled(savedSound);

    applyTheme(savedTheme);
    applyScale(savedScale);
  }, []);

  const applyTheme = (t: ContrastTheme) => {
    document.documentElement.classList.remove("theme-yellow-black", "theme-dark-contrast", "theme-blue-contrast");
    document.body.classList.remove("theme-yellow-black", "theme-dark-contrast", "theme-blue-contrast");

    if (t !== "normal") {
      document.documentElement.classList.add(`theme-${t}`);
      document.body.classList.add(`theme-${t}`);
    }
    setTheme(t);
    localStorage.setItem("lentera_theme", t);
  };

  const applyScale = (s: TextScale) => {
    document.documentElement.classList.remove("font-scale-large", "font-scale-xlarge");
    if (s === "large") document.documentElement.classList.add("font-scale-large");
    if (s === "xlarge") document.documentElement.classList.add("font-scale-xlarge");
    setScale(s);
    localStorage.setItem("lentera_scale", s);
  };

  const updateSpeechRate = (r: number) => {
    setSpeechRate(r);
    localStorage.setItem("lentera_speech_rate", r.toString());
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem("lentera_sound", next ? "true" : "false");
  };

  const testTTS = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeakingTest(true);

    const utter = new SpeechSynthesisUtterance(
      "Halo, ini adalah pengujian suara pembaca layar LENTERA. Sistem siap mendampingi praktikum sains inklusif Anda."
    );
    utter.lang = "id-ID";
    utter.rate = speechRate;
    utter.onend = () => setIsSpeakingTest(false);
    utter.onerror = () => setIsSpeakingTest(false);
    window.speechSynthesis.speak(utter);
  };

  // Keyboard shortcut listener Alt+A to toggle modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md transition-all"
      role="dialog"
      aria-modal="true"
      aria-labelledby="acc-title"
    >
      <div className="card relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/60 bg-white/95 p-6 shadow-2xl cs-scroll md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cs-primary/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cs-primaryDeep text-white shadow-md">
              <Eye className="h-5 w-5" />
            </span>
            <div>
              <h2 id="acc-title" className="font-heading text-xl font-extrabold text-cs-text">
                Pusat Aksesibilitas LENTERA
              </h2>
              <p className="text-xs font-semibold text-cs-textSoft">
                Standar WCAG 2.1 AAA untuk Peserta Didik Tunanetra & Low Vision
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Pusat Aksesibilitas"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Section 1: Contrast Theme */}
          <div>
            <label className="flex items-center gap-2 font-heading text-sm font-bold text-cs-text">
              <Sun className="h-4 w-4 text-cs-primaryDeep" />
              Mode Tampilan & Kontras Warna
            </label>
            <p className="mt-1 text-xs text-cs-textSoft">
              Pilih kontras warna optimal untuk kenyamanan penglihatan rendah (Low Vision)
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {[
                { id: "normal", label: "Modern Light", bg: "bg-purple-50 text-purple-900 border-purple-200" },
                { id: "yellow-black", label: "Kuning-Hitam (Rekomendasi)", bg: "bg-black text-yellow-300 border-yellow-400 font-bold" },
                { id: "dark-contrast", label: "Dark High-Contrast", bg: "bg-slate-900 text-white border-slate-700" },
                { id: "blue-contrast", label: "Biru Navy Kontras", bg: "bg-blue-950 text-cyan-300 border-cyan-400" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => applyTheme(item.id as ContrastTheme)}
                  className={`flex flex-col items-center justify-center rounded-xl border-2 p-3 text-center text-xs font-bold transition ${item.bg} ${
                    theme === item.id ? "ring-4 ring-cs-primaryDeep" : "opacity-80 hover:opacity-100"
                  }`}
                  aria-pressed={theme === item.id}
                >
                  <span>{item.label}</span>
                  {theme === item.id && <Check className="mt-1 h-3.5 w-3.5 text-current" />}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Font Scaling */}
          <div>
            <label className="flex items-center gap-2 font-heading text-sm font-bold text-cs-text">
              <Type className="h-4 w-4 text-cs-primaryDeep" />
              Ukuran Teks Aplikasi
            </label>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { id: "normal", label: "Standar (100%)", size: "text-sm" },
                { id: "large", label: "Besar (115%)", size: "text-base font-bold" },
                { id: "xlarge", label: "Ekstra Besar (130%)", size: "text-lg font-extrabold" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => applyScale(item.id as TextScale)}
                  className={`rounded-xl border p-3 text-center transition ${item.size} ${
                    scale === item.id
                      ? "border-cs-primaryDeep bg-cs-primarySoft text-cs-primaryDeep ring-2 ring-cs-primaryDeep"
                      : "border-gray-200 bg-gray-50 text-cs-text hover:bg-gray-100"
                  }`}
                  aria-pressed={scale === item.id}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Speech & Audio Synthesis */}
          <div>
            <label className="flex items-center gap-2 font-heading text-sm font-bold text-cs-text">
              <Volume2 className="h-4 w-4 text-cs-primaryDeep" />
              Kecepatan Pembacaan Suara (Text-to-Speech)
            </label>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {[
                { rate: 0.8, label: "Perlahan (0.8x)" },
                { rate: 1.0, label: "Normal (1.0x)" },
                { rate: 1.25, label: "Cepat (1.25x)" },
              ].map((item) => (
                <button
                  key={item.rate}
                  onClick={() => updateSpeechRate(item.rate)}
                  className={`rounded-xl border px-4 py-2 text-xs font-bold transition ${
                    speechRate === item.rate
                      ? "border-cs-primaryDeep bg-cs-primaryDeep text-white"
                      : "border-gray-200 bg-gray-50 text-cs-text hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={testTTS}
                disabled={isSpeakingTest}
                className="flex items-center gap-1.5 rounded-xl bg-cs-green/20 px-4 py-2 text-xs font-bold text-emerald-800 transition hover:bg-cs-green/30"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                {isSpeakingTest ? "Memutar Suara..." : "Uji Suara"}
              </button>
            </div>
          </div>

          {/* Section 4: Keyboard Shortcuts */}
          <div>
            <label className="flex items-center gap-2 font-heading text-sm font-bold text-cs-text">
              <Keyboard className="h-4 w-4 text-cs-primaryDeep" />
              Pintasan Keyboard (Navigasi Cepat)
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2 border border-gray-200">
                <span className="text-cs-textSoft">Alt + 1</span>
                <span className="font-bold text-cs-text">Beranda Utama</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2 border border-gray-200">
                <span className="text-cs-textSoft">Alt + 2</span>
                <span className="font-bold text-cs-text">Lab CLE AI</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2 border border-gray-200">
                <span className="text-cs-textSoft">Alt + 3</span>
                <span className="font-bold text-cs-text">LENTERA AI Tutor</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2 border border-gray-200">
                <span className="text-cs-textSoft">Alt + 4</span>
                <span className="font-bold text-cs-text">Dashboard Siswa</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2 border border-gray-200">
                <span className="text-cs-textSoft">Alt + 5</span>
                <span className="font-bold text-cs-text">Dashboard Guru</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2 border border-gray-200">
                <span className="text-cs-textSoft">Alt + 6</span>
                <span className="font-bold text-cs-text">Dashboard Orang Tua</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2 border border-gray-200">
                <span className="text-cs-textSoft">Alt + 7</span>
                <span className="font-bold text-cs-text">Buku Digital (Handbook)</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-2 border border-gray-200">
                <span className="text-cs-textSoft">Alt + A</span>
                <span className="font-bold text-cs-text">Buka Aksesibilitas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end border-t border-cs-primary/10 pt-4">
          <button
            onClick={onClose}
            className="rounded-2xl bg-cs-primaryDeep px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition hover:bg-cs-primaryHover"
          >
            Terapkan & Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
