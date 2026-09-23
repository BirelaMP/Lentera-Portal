"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Bot, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, AlertCircle,
  HelpCircle, CheckCircle2, RotateCcw, Sliders, Play, Square, Compass,
  Layers, ChevronRight, BrainCircuit
} from "lucide-react";

type TutorMode = "exploration" | "troubleshooting" | "reflection" | "evaluation";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
  note?: string;
  mode?: TutorMode;
}

const MODE_DETAILS: Record<TutorMode, { name: string; tag: string; desc: string; icon: string; promptPlaceholder: string }> = {
  exploration: {
    name: "Exploration Mode",
    tag: "Pengenalan Komponen & Taktil",
    desc: "Eksplorasi bebas komponen listrik, letak kutub, dan sensasi fisik rangkaian.",
    icon: "🧭",
    promptPlaceholder: "Tanyakan tentang baterai, saklar, atau alur kabel taktil...",
  },
  troubleshooting: {
    name: "Troubleshooting Mode",
    tag: "Explain Before Answer",
    desc: "Deteksi dan selesaikan masalah rangkaian langkah-demi-langkah dengan bimbingan sokratik.",
    icon: "🔧",
    promptPlaceholder: "Laporkan apa yang kamu rasakan: lampu tidak menyala, saklar macet...",
  },
  reflection: {
    name: "Concept Reflection",
    tag: "Penalaran Konsep Ilmiah",
    desc: "Refleksi ilmiah: Mengapa arus mengalir, hukum Ohm, dan analogi taktil listrik.",
    icon: "💡",
    promptPlaceholder: "Kenapa lampu redup saat ditambah beban secara seri?...",
  },
  evaluation: {
    name: "Evaluation Mode",
    tag: "Kuis & Asesmen Mandiri",
    desc: "Uji pemahaman mandiri dengan tantangan kuis berbasis sentuhan.",
    icon: "🎯",
    promptPlaceholder: "Jawab kuis atau minta soal tantangan baru...",
  },
};

const MODE_PROMPTS: Record<TutorMode, string[]> = {
  exploration: [
    "Bagaimana cara membedakan kutub positif dan negatif baterai dengan meraba?",
    "Apa fungsi saklar pada papan taktil kita?",
    "Ceritakan bentuk alur kabel dari baterai ke lampu.",
  ],
  troubleshooting: [
    "Lampu saya tidak menyala padahal baterai sudah terpasang. Tolong bimbing.",
    "Bagaimana cara memeriksa apakah kabel taktil sudah terhubung erat?",
    "Apakah posisi polaritas lampu saya terbalik?",
  ],
  reflection: [
    "Mengapa saat 2 lampu dirangkai seri nyalanya lebih redup?",
    "Apa perbedaan merasakan rangkaian seri dibanding paralel?",
    "Mengapa listrik membutuhkan jalur tertutup untuk mengalir?",
  ],
  evaluation: [
    "Berikan aku satu kuis praktikum tentang rangkaian seri!",
    "Uji pemahamanku tentang arah aliran arus listrik.",
    "Beri tantangan analisa rangkaian untuk Level 2.",
  ],
};

export default function TutorPage() {
  const [activeMode, setActiveMode] = useState<TutorMode>("troubleshooting");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      role: "assistant",
      text: "Halo! Aku LENTERA AI ASSISTANT. Kita sedang berada dalam Mode Bimbingan Praktikum. Raba komponen di papanmu atau tanyakan hal yang ingin kamu selidiki.",
      timestamp: "Sekarang",
      note: "Pedagogi Taktil Inklusif",
      mode: "troubleshooting",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const [circuitContext, setCircuitContext] = useState<"normal" | "wrong_polarity" | "open_switch">("wrong_polarity");

  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Speech Recognition Setup (Web Speech API)
  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognizer = new SpeechRecognition();
      recognizer.continuous = false;
      recognizer.interimResults = false;
      recognizer.lang = "id-ID";

      recognizer.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsRecording(false);
      };
      recognizer.onerror = () => setIsRecording(false);
      recognizer.onend = () => setIsRecording(false);
      recognitionRef.current = recognizer;
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Pengenalan suara mikrofon tidak didukung pada browser ini. Silakan gunakan Google Chrome atau Edge.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const speakText = (text: string, id: string) => {
    if (!("speechSynthesis" in window)) return;
    if (currentlySpeakingId === id) {
      window.speechSynthesis.cancel();
      setCurrentlySpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setCurrentlySpeakingId(id);

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "id-ID";
    utter.rate = parseFloat(localStorage.getItem("lentera_speech_rate") || "1.0");
    utter.onend = () => setCurrentlySpeakingId(null);
    utter.onerror = () => setCurrentlySpeakingId(null);
    window.speechSynthesis.speak(utter);
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: "u_" + Date.now(),
      role: "user",
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const circuitPayload =
        circuitContext === "wrong_polarity"
          ? { isBattery: true, isSwitch: true, isLamp: true, isLampReversed: true, polarity_correct: false, circuit_closed: false }
          : circuitContext === "open_switch"
          ? { isBattery: true, isSwitch: false, isLamp: true, isSwitchOpen: true, circuit_closed: false }
          : { isBattery: true, isSwitch: true, isLamp: true, polarity_correct: true, circuit_closed: true };

      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend.trim(),
          mode: activeMode,
          circuitState: circuitPayload,
          history: messages.map((m) => ({ role: m.role === "user" ? "user" : "ai", text: m.text })),
        }),
      });

      const data = await res.json();
      const aiText = data.text || "Coba raba kembali posisi komponenmu.";
      const aiMsgId = "ai_" + Date.now();

      const aiMsg: Message = {
        id: aiMsgId,
        role: "assistant",
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        note: data.note || "Bimbingan Sokratik",
        mode: activeMode,
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (autoSpeak) {
        speakText(aiText, aiMsgId);
      }
    } catch (err) {
      const errMsg: Message = {
        id: "err_" + Date.now(),
        role: "assistant",
        text: "Maaf, coba raba jalur kabelmu sebentar sambil memeriksa koneksi.",
        timestamp: "Sekarang",
        note: "Koneksi Offline",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-cs-bg px-4 py-8 font-body text-cs-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-bold text-cs-primaryDeep">
              <Bot className="h-4 w-4" />
              <span>Intelligent Tutoring System — LIDM 2026</span>
            </div>
            <h1 className="mt-2 font-heading text-3xl font-black text-cs-text sm:text-4xl">
              LENTERA AI ASSISTANT
            </h1>
            <p className="mt-1 text-sm text-cs-textSoft">
              Bukan chatbot biasa — asisten kontekstual berpedoman <em>Explain Before Answer</em> dengan kosakata ramah disabilitas netra.
            </p>
          </div>

          {/* Quick Context & Voice Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-cs-textSoft">
              <span>Status Rangkaian:</span>
              <select
                value={circuitContext}
                onChange={(e) => setCircuitContext(e.target.value as any)}
                className="bg-transparent font-bold text-cs-primaryDeep focus:outline-none"
              >
                <option value="wrong_polarity">Lampu Terbalik</option>
                <option value="open_switch">Saklar Terbuka</option>
                <option value="normal">Normal Sempurna</option>
              </select>
            </div>

            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                autoSpeak ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"
              }`}
            >
              {autoSpeak ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              <span>Auto-TTS: {autoSpeak ? "Aktif" : "Mati"}</span>
            </button>
          </div>
        </div>

        {/* 4 Mode Tabs */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(Object.keys(MODE_DETAILS) as TutorMode[]).map((m) => {
            const detail = MODE_DETAILS[m];
            const active = activeMode === m;
            return (
              <button
                key={m}
                onClick={() => setActiveMode(m)}
                className={`card flex flex-col items-start rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-cs-primaryDeep bg-purple-50/90 shadow-md ring-2 ring-cs-primaryDeep"
                    : "border-gray-200 bg-white/80 hover:bg-gray-50"
                }`}
              >
                <span className="text-xl">{detail.icon}</span>
                <span className="mt-2 font-heading text-xs font-extrabold text-cs-text">
                  {detail.name}
                </span>
                <span className="mt-0.5 text-[10px] text-cs-textSoft line-clamp-1">{detail.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Tactile Safeguard Banner */}
        <div className="flex items-center justify-between rounded-2xl border border-purple-200 bg-purple-50/60 px-4 py-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cs-primaryDeep">Standar Kosakata Taktil:</span>
            <span className="text-cs-text">Menggunakan kata <em>"raba"</em>, <em>"rasakan"</em>, <em>"temukan"</em> (Bebas bias visual).</span>
          </div>
          <span className="hidden font-mono text-[10px] text-purple-700 sm:inline">WCAG Compliant</span>
        </div>

        {/* Chat Container */}
        <div className="card flex h-[540px] flex-col rounded-3xl border border-white/80 bg-white/90 shadow-xl backdrop-blur-xl">
          {/* Messages Scroll Area */}
          <div className="flex-1 space-y-4 overflow-y-auto p-5 cs-scroll">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-sm">
                    <Bot className="h-5 w-5" />
                  </div>
                )}

                <div className={`max-w-[82%] space-y-1.5 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  <div
                    className={`rounded-2xl px-4.5 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-cs-primaryDeep text-white shadow-sm"
                        : "border border-purple-100 bg-purple-50/70 text-cs-text shadow-xs"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-cs-textSoft px-1">
                    <span>{msg.timestamp}</span>
                    {msg.note && (
                      <span className="rounded-md bg-purple-100 px-1.5 py-0.2 font-bold text-purple-700">
                        {msg.note}
                      </span>
                    )}
                    {msg.role === "assistant" && (
                      <button
                        onClick={() => speakText(msg.text, msg.id)}
                        className="flex items-center gap-1 font-bold text-cs-primaryDeep hover:underline"
                        title="Dengarkan Suara"
                      >
                        <Volume2 className="h-3 w-3" />
                        <span>{currentlySpeakingId === msg.id ? "Berhenti" : "Dengarkan"}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-600 text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="rounded-2xl border border-purple-100 bg-purple-50 p-3">
                  <div className="typing flex items-center gap-1">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Reply Chips */}
          <div className="border-t border-gray-100 bg-gray-50/60 px-5 py-2.5">
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs cs-scroll">
              <span className="shrink-0 text-[10px] font-bold uppercase text-cs-textSoft">
                Pemicu Diskusi:
              </span>
              {MODE_PROMPTS[activeMode].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="chip shrink-0 rounded-full border border-purple-200 bg-white px-3 py-1 text-xs font-semibold text-cs-primaryDeep hover:bg-purple-100 shadow-xs"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box with Voice Mic */}
          <div className="border-t border-gray-100 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              {/* Mic Speech Button */}
              <button
                type="button"
                onClick={toggleRecording}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition ${
                  isRecording
                    ? "bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30"
                    : "bg-purple-100 text-cs-primaryDeep hover:bg-purple-200"
                }`}
                title="Bicara lewat Mikrofon (Speech-to-Text)"
                aria-label="Input Suara Mikrofon"
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={isRecording ? "Mendengarkan suaramu..." : MODE_DETAILS[activeMode].promptPlaceholder}
                className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-cs-text placeholder-cs-textSoft focus:border-cs-primaryDeep focus:outline-none focus:ring-2 focus:ring-purple-200"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="flex h-11 items-center gap-1.5 rounded-2xl bg-cs-primaryDeep px-5 text-sm font-bold text-white shadow-md shadow-purple-500/25 transition hover:bg-cs-primaryHover disabled:opacity-50"
              >
                <span>Kirim</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
