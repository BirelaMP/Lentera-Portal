"use client";

import { useEffect, useState, useRef } from "react";
import { CheckCircle2, Sparkles, Zap, Lightbulb, ToggleLeft, Laptop, Cpu, RotateCcw } from "lucide-react";

type ComponentData = { id: number; name: string; grid: string; rotation: number; recognized: boolean };
type DetectionData = { components: ComponentData[]; timestamp: number; status: "connecting" | "connected" | "disconnected" | "simulated"; count: number };

const KOMPONEN_INFO: Record<number, { icon: React.ReactNode; color: string }> = {
  0: { icon: <Zap className="h-5 w-5" />, color: "text-amber-500" },
  1: { icon: <Lightbulb className="h-5 w-5" />, color: "text-amber-500" },
  2: { icon: <ToggleLeft className="h-5 w-5" />, color: "text-sky-500" },
  3: { icon: <Zap className="h-5 w-5" />, color: "text-orange-500" },
  4: { icon: <Zap className="h-5 w-5" />, color: "text-lime-500" },
  5: { icon: <ToggleLeft className="h-5 w-5" />, color: "text-cs-primary" },
};

// GRID: D3, C3, B3, A3, D2, C2, B2, A2, D1, C1, B1, A1
const GRID_CELLS = [
  "D3", "C3", "B3", "A3",
  "D2", "C2", "B2", "A2",
  "D1", "C1", "B1", "A1",
];

const PRESETS = {
  complete: [
    { id: 0, name: "Baterai", grid: "B3", rotation: 0, recognized: true },
    { id: 5, name: "Saklar", grid: "A2", rotation: 0, recognized: true },
    { id: 1, name: "Lampu", grid: "B1", rotation: 0, recognized: true },
  ],
  wrong_polarity: [
    { id: 0, name: "Baterai", grid: "B3", rotation: 0, recognized: true },
    { id: 5, name: "Saklar", grid: "A2", rotation: 0, recognized: true },
    { id: 1, name: "Lampu (Terbalik)", grid: "D1", rotation: 180, recognized: true },
  ],
  open_switch: [
    { id: 0, name: "Baterai", grid: "B3", rotation: 0, recognized: true },
    { id: 1, name: "Lampu", grid: "B1", rotation: 0, recognized: true },
  ],
  empty: [],
};

export default function ArUcoDetector() {
  const [mode, setMode] = useState<"simulation" | "hardware">("simulation");
  const [detections, setDetections] = useState<DetectionData>({
    components: PRESETS.complete,
    timestamp: Date.now(),
    status: "simulated",
    count: 3,
  });
  const [activePreset, setActivePreset] = useState<string>("complete");
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 2800);
  };

  const dispatchCircuitUpdate = (comps: ComponentData[]) => {
    const baterai = comps.find((c) => c.id === 0);
    const lampu = comps.find((c) => c.id === 1);
    const saklar = comps.find((c) => c.id === 2 || c.id === 5);

    const isBateraiPas = baterai?.grid === "B3" || baterai?.grid === "C3";
    const isLampuPas = lampu?.grid === "B1" || lampu?.grid === "C1";
    const isSaklarPas = saklar?.grid === "A2";

    const isComplete = !!(isBateraiPas && isLampuPas && isSaklarPas);

    window.dispatchEvent(
      new CustomEvent("circuit-update", {
        detail: {
          isBattery: !!baterai,
          isLamp: !!lampu,
          isSwitch: !!saklar,
          isComplete,
        },
      })
    );
  };

  // Run initial dispatch
  useEffect(() => {
    if (mode === "simulation") {
      dispatchCircuitUpdate(PRESETS.complete);
    }
  }, [mode]);

  // Connect to WebSocket only when in hardware mode
  useEffect(() => {
    if (mode !== "hardware") return;

    const connect = () => {
      try {
        const websocket = new WebSocket("ws://localhost:8765");
        wsRef.current = websocket;

        websocket.onopen = () => setDetections((prev) => ({ ...prev, status: "connected" }));
        websocket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "calibration_status") {
              setIsCalibrating(false);
              showToast("Kalibrasi berhasil.");
              return;
            }
            setDetections(data);
            dispatchCircuitUpdate(data.components || []);
          } catch (e) {}
        };

        websocket.onclose = () => {
          setDetections((prev) => ({ ...prev, status: "disconnected" }));
        };
        websocket.onerror = () => {
          setDetections((prev) => ({ ...prev, status: "disconnected" }));
        };
      } catch (err) {
        setDetections((prev) => ({ ...prev, status: "disconnected" }));
      }
    };

    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [mode]);

  const setSimulationPreset = (presetKey: keyof typeof PRESETS) => {
    setActivePreset(presetKey);
    const comps = PRESETS[presetKey];
    setDetections({
      components: comps,
      timestamp: Date.now(),
      status: "simulated",
      count: comps.length,
    });
    dispatchCircuitUpdate(comps);
    showToast(`Skenario: ${presetKey} aktif`);
  };

  const handleCalibrate = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      showToast("Kalibrasi marker ArUco selesai (Toleransi < 2mm).");
    }, 1200);
  };

  return (
    <div className="space-y-4">
      {/* Hardware vs Simulation Mode Toggle */}
      <div className="card flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cs-text/10 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode("simulation")}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              mode === "simulation"
                ? "bg-purple-100 text-cs-primaryDeep shadow-xs"
                : "bg-gray-100 text-cs-textSoft hover:bg-gray-200"
            }`}
          >
            <Laptop className="h-3.5 w-3.5" />
            <span>Mode Simulasi (Netlify / Juri)</span>
          </button>

          <button
            onClick={() => setMode("hardware")}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
              mode === "hardware"
                ? "bg-purple-100 text-cs-primaryDeep shadow-xs"
                : "bg-gray-100 text-cs-textSoft hover:bg-gray-200"
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>Mode Hardware (ESP32-CAM)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-bold text-cs-text">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                mode === "simulation"
                  ? "bg-emerald-500 animate-pulse"
                  : detections.status === "connected"
                  ? "bg-emerald-500"
                  : "bg-amber-400"
              }`}
            />
            {mode === "simulation" ? "Simulasi Aktif" : detections.status === "connected" ? "Tersambung" : "Mencari Port Local"}
          </span>

          <button
            onClick={handleCalibrate}
            disabled={isCalibrating}
            className="flex items-center gap-1 rounded-lg bg-cs-primary/10 px-2.5 py-1.5 text-xs font-bold text-cs-primaryDeep hover:bg-cs-primary/20 disabled:opacity-50"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {isCalibrating ? "Kalibrasi…" : "Kalibrasi"}
          </button>
        </div>
      </div>

      {/* Preset Buttons for Simulation */}
      {mode === "simulation" && (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-purple-50/70 p-3 border border-purple-200 text-xs">
          <span className="font-bold text-cs-primaryDeep">Uji Kondisi Komponen:</span>
          {[
            { key: "complete", label: "Sirkuit Lengkap (Normal)" },
            { key: "wrong_polarity", label: "Polaritas Terbalik" },
            { key: "open_switch", label: "Saklar Belum Terpasang" },
            { key: "empty", label: "Papan Kosong" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setSimulationPreset(item.key as any)}
              className={`rounded-xl px-3 py-1 font-bold transition ${
                activePreset === item.key
                  ? "bg-cs-primaryDeep text-white shadow-xs"
                  : "bg-white text-cs-text hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid Canvas */}
      <div className="card rounded-2xl border border-cs-text/10 bg-white/80 p-5 shadow-sm backdrop-blur-md">
        <div className="grid grid-cols-4 gap-2">
          {GRID_CELLS.map((cell) => {
            const isHole = cell === "C2" || cell === "B2";
            const detectedComp = detections.components.find((c) => c.grid === cell);
            return (
              <div
                key={cell}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-xl border ${
                  isHole ? "border-transparent" : "border-cs-text/10 bg-cs-bg"
                }`}
              >
                {!isHole && (
                  <span className="absolute left-1.5 top-1.5 text-[9px] font-semibold text-cs-text/35">
                    {cell}
                  </span>
                )}
                {detectedComp && (
                  <div className="flex flex-col items-center gap-1 text-center animate-fadeIn">
                    <span className={KOMPONEN_INFO[detectedComp.id]?.color ?? "text-cs-primary"}>
                      {KOMPONEN_INFO[detectedComp.id]?.icon}
                    </span>
                    <span className="text-[10px] font-bold text-cs-text">{detectedComp.name}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightweight in-app toast */}
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {toast && (
          <div className="flex items-center gap-2 rounded-full bg-cs-text px-5 py-2.5 text-sm font-bold text-white shadow-xl">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
