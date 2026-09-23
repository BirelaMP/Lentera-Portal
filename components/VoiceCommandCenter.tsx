"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Mic, MicOff, Volume2, X, Sparkles, Navigation, Command, Check } from "lucide-react";

interface VoiceCommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerAccessibility?: () => void;
  onTriggerDemoLIDM?: () => void;
}

const COMMAND_MAP: { triggers: string[]; targetUrl?: string; actionName: string; announceText: string; specialAction?: string }[] = [
  {
    triggers: ["buka laboratorium", "buka lab", "buka aruco", "buka smart board"],
    targetUrl: "/aruco",
    actionName: "LENTERA Lab (Smart Board)",
    announceText: "Membuka LENTERA Lab dan deteksi papan taktil.",
  },
  {
    triggers: ["buka cle", "buka engine", "simulasi praktikum", "buka simulasi"],
    targetUrl: "/cle",
    actionName: "Context-Aware Learning Engine",
    announceText: "Membuka Lab Context-Aware Learning Engine.",
  },
  {
    triggers: ["buka asisten", "buka tutor", "tanya ai", "buka asisten ai"],
    targetUrl: "/tutor",
    actionName: "LENTERA AI ASSISTANT",
    announceText: "Membuka LENTERA AI ASSISTANT empat mode.",
  },
  {
    triggers: ["buka siswa", "dasbor siswa", "progres belajar", "halaman siswa"],
    targetUrl: "/student",
    actionName: "Dasbor Siswa",
    announceText: "Membuka Dasbor Peserta Didik Tunanetra.",
  },
  {
    triggers: ["buka guru", "dasbor guru", "analitik guru", "halaman guru"],
    targetUrl: "/teacher",
    actionName: "Dasbor Guru",
    announceText: "Membuka Dasbor Analitik Guru dan Pola Kesalahan.",
  },
  {
    triggers: ["buka orang tua", "dasbor orang tua", "halaman orang tua"],
    targetUrl: "/parent",
    actionName: "Dasbor Orang Tua",
    announceText: "Membuka Dasbor Pemantauan Orang Tua.",
  },
  {
    triggers: ["buka buku", "buka panduan", "handbook", "buku digital"],
    targetUrl: "/handbook",
    actionName: "Buku Panduan Digital",
    announceText: "Membuka Buku Panduan Digital Praktikum Sains.",
  },
  {
    triggers: ["buka beranda", "ke beranda", "halaman utama", "kembali"],
    targetUrl: "/",
    actionName: "Beranda Utama",
    announceText: "Kembali ke Beranda Utama LENTERA.",
  },
  {
    triggers: ["buka aksesibilitas", "kontras tinggi", "pengaturan aksesibilitas"],
    specialAction: "accessibility",
    actionName: "Pusat Aksesibilitas",
    announceText: "Membuka Pusat Aksesibilitas WCAG.",
  },
  {
    triggers: ["demo lidm", "mode juri", "mode demo"],
    specialAction: "demo_lidm",
    actionName: "Mode Presentasi Juri LIDM",
    announceText: "Mengaktifkan Mode Demo 5 Menit LIDM.",
  },
];

export default function VoiceCommandCenter({
  isOpen,
  onClose,
  onTriggerAccessibility,
  onTriggerDemoLIDM,
}: VoiceCommandCenterProps) {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Setup Web Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognizer = new SpeechRecognition();
      recognizer.continuous = false;
      recognizer.interimResults = true;
      recognizer.lang = "id-ID";

      recognizer.onresult = (event: any) => {
        const current = event.results[0][0].transcript.toLowerCase();
        setTranscript(current);

        if (event.results[0].isFinal) {
          executeVoiceCommand(current);
        }
      };

      recognizer.onerror = () => setIsListening(false);
      recognizer.onend = () => setIsListening(false);
      recognitionRef.current = recognizer;
    }
  }, []);

  const speakConfirmation = (text: string, callback?: () => void) => {
    if (!("speechSynthesis" in window)) {
      if (callback) callback();
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "id-ID";
    utter.rate = 1.0;
    utter.onend = () => {
      if (callback) callback();
    };
    utter.onerror = () => {
      if (callback) callback();
    };
    window.speechSynthesis.speak(utter);
  };

  const executeVoiceCommand = (spokenText: string) => {
    const text = spokenText.toLowerCase().trim();
    let matched = false;

    for (const cmd of COMMAND_MAP) {
      if (cmd.triggers.some((t) => text.includes(t))) {
        matched = true;
        setFeedback(cmd.announceText);
        speakConfirmation(cmd.announceText, () => {
          if (cmd.specialAction === "accessibility" && onTriggerAccessibility) {
            onClose();
            onTriggerAccessibility();
          } else if (cmd.specialAction === "demo_lidm" && onTriggerDemoLIDM) {
            onClose();
            onTriggerDemoLIDM();
          } else if (cmd.targetUrl) {
            onClose();
            router.push(cmd.targetUrl);
          }
        });
        break;
      }
    }

    if (!matched) {
      setFeedback(`Perintah "${text}" belum dikenali. Coba ucapkan: "buka laboratorium", "buka cle", atau "buka siswa".`);
      speakConfirmation("Perintah belum dikenali. Silakan ulangi.");
    }
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      alert("Pengenalan suara tidak didukung browser ini. Gunakan Google Chrome.");
      return;
    }
    setTranscript("");
    setFeedback(null);
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (e) {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md transition-all"
      role="dialog"
      aria-modal="true"
      aria-label="Pusat Navigasi Suara"
    >
      <div className="card relative w-full max-w-lg rounded-3xl border border-white/80 bg-white/95 p-6 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md">
              <Mic className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-heading text-lg font-black text-cs-text">
                Voice Command Center
              </h3>
              <p className="text-xs text-cs-textSoft">
                Navigasi suara hands-free bahasa Indonesia untuk tunanetra
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

        {/* Voice Trigger Section */}
        <div className="mt-6 flex flex-col items-center justify-center text-center">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 shadow-xl ${
              isListening
                ? "bg-rose-500 text-white animate-pulse ring-8 ring-rose-200 scale-110"
                : "bg-cs-primaryDeep text-white hover:bg-cs-primaryHover shadow-purple-500/30"
            }`}
          >
            {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
          </button>

          <div className="mt-4 font-heading text-sm font-extrabold text-cs-text">
            {isListening ? "Mendengarkan suara Anda..." : "Tekan mikrofon dan ucapkan perintah"}
          </div>

          {transcript && (
            <div className="mt-2 rounded-xl bg-purple-50 px-4 py-2 text-xs font-bold text-cs-primaryDeep border border-purple-200">
              "{transcript}"
            </div>
          )}

          {feedback && (
            <div className="mt-2 text-xs font-semibold text-emerald-700">
              {feedback}
            </div>
          )}
        </div>

        {/* Command Examples & Quick Click */}
        <div className="mt-6 border-t border-gray-100 pt-4">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-cs-textSoft mb-2">
            Contoh Perintah Suara (Klik untuk Uji Langsung):
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { label: '"buka laboratorium"', desc: "Buka LENTERA Lab" },
              { label: '"buka cle"', desc: "Lab Context-Aware AI" },
              { label: '"buka asisten"', desc: "LENTERA AI Assistant" },
              { label: '"buka siswa"', desc: "Dasbor Siswa & Skill Map" },
              { label: '"buka guru"', desc: "Dasbor Analitik Guru" },
              { label: '"buka orang tua"', desc: "Dasbor Orang Tua" },
              { label: '"buka panduan"', desc: "Buku Digital Handbook" },
              { label: '"demo lidm"', desc: "Mode Presentasi Juri" },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => executeVoiceCommand(item.label.replace(/"/g, ""))}
                className="flex flex-col items-start rounded-xl border border-gray-100 bg-gray-50/70 p-2 text-left hover:border-purple-300 hover:bg-purple-50 transition"
              >
                <span className="font-bold text-cs-primaryDeep">{item.label}</span>
                <span className="text-[10px] text-cs-textSoft">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
