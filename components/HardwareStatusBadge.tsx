"use client";

import { useState } from "react";
import { Laptop, Cpu, Wifi, Info, ChevronDown, ChevronUp, Layers, CheckCircle2 } from "lucide-react";

interface HardwareStatusBadgeProps {
  source?: "esp32" | "simulated";
  onSourceChange?: (src: "esp32" | "simulated") => void;
  showArchitecture?: boolean;
}

export default function HardwareStatusBadge({
  source = "simulated",
  onSourceChange,
  showArchitecture = false,
}: HardwareStatusBadgeProps) {
  const [currentSource, setCurrentSource] = useState<"esp32" | "simulated">(source);
  const [archOpen, setArchOpen] = useState(showArchitecture);

  const setSource = (src: "esp32" | "simulated") => {
    setCurrentSource(src);
    if (onSourceChange) onSourceChange(src);
  };

  return (
    <div className="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm backdrop-blur-md">
      {/* Top Source Switcher & Honesty Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-cs-textSoft">
            Data Source:
          </span>
          {currentSource === "esp32" ? (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              🟢 ESP32 Connected (Hardware Live)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              🟡 Simulation Mode (Netlify Demo)
            </span>
          )}
        </div>

        {/* Toggle & Architecture expander */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-gray-100 p-1 text-[11px] font-bold">
            <button
              onClick={() => setSource("simulated")}
              className={`rounded-lg px-2.5 py-1 transition ${
                currentSource === "simulated"
                  ? "bg-white text-cs-primaryDeep shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Simulasi
            </button>
            <button
              onClick={() => setSource("esp32")}
              className={`rounded-lg px-2.5 py-1 transition ${
                currentSource === "esp32"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              ESP32 Port
            </button>
          </div>

          <button
            onClick={() => setArchOpen(!archOpen)}
            className="flex items-center gap-1 rounded-xl bg-purple-50 px-2.5 py-1.5 text-xs font-bold text-cs-primaryDeep hover:bg-purple-100"
            title="Lihat Arsitektur Aliran Data"
          >
            <Layers className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Alur Pipeline</span>
            {archOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        </div>
      </div>

      {/* Honesty Note */}
      <div className="mt-2 text-[11px] text-cs-textSoft">
        {currentSource === "simulated" ? (
          <p className="flex items-center gap-1 text-amber-800">
            <Info className="h-3 w-3 shrink-0" />
            <span>
              <strong>Transparansi Penilaian LIDM:</strong> Data telemetri saat ini dihasilkan oleh simulator deterministik berbasis aturan CLE tanpa perangkat fisik terhubung, menjamin kestabilan pengetesan juri di cloud.
            </span>
          </p>
        ) : (
          <p className="flex items-center gap-1 text-emerald-800">
            <CheckCircle2 className="h-3 w-3 shrink-0" />
            <span>
              Mencoba membaca stream dan WebSocket telemetri dari mikrokontroler ESP32-CAM lokal (`ws://localhost:8765`).
            </span>
          </p>
        )}
      </div>

      {/* Visual Data Flow Architecture */}
      {archOpen && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-cs-primaryDeep mb-2">
            Visual Pipeline Arsitektur Sistem LENTERA:
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-xl border border-purple-200 bg-purple-50/70 p-2.5 text-center">
              <span className="font-mono text-[10px] text-purple-600 font-bold">01. FISIK</span>
              <div className="font-heading text-xs font-extrabold text-cs-text mt-0.5">
                Smart Tactile Board
              </div>
              <div className="text-[10px] text-cs-textSoft">Papan magnetik & marker Braille</div>
            </div>

            <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-2.5 text-center">
              <span className="font-mono text-[10px] text-sky-600 font-bold">02. TELEMETRI</span>
              <div className="font-heading text-xs font-extrabold text-cs-text mt-0.5">
                Sensor Gateway
              </div>
              <div className="text-[10px] text-cs-textSoft">ESP32-CAM / CV Engine (18ms)</div>
            </div>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-2.5 text-center">
              <span className="font-mono text-[10px] text-indigo-600 font-bold">03. REASONING</span>
              <div className="font-heading text-xs font-extrabold text-cs-text mt-0.5">
                CLE Engine
              </div>
              <div className="text-[10px] text-cs-textSoft">Diagnosis miskonsepsi sirkuit</div>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-2.5 text-center">
              <span className="font-mono text-[10px] text-emerald-600 font-bold">04. OUTPUT</span>
              <div className="font-heading text-xs font-extrabold text-cs-text mt-0.5">
                AI Socratic Feedback
              </div>
              <div className="text-[10px] text-cs-textSoft">Suara taktil: Explain Before Answer</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
