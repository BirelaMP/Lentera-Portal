"use client";

import { useState, useEffect, useRef } from "react";
import { Video, Wifi, WifiOff, RotateCcw, Maximize2, Minimize2, Eye, Sparkles } from "lucide-react";

const RELAY_STREAM_URL = "http://localhost:8081/stream";

export default function CameraStream() {
  const [streamUrl] = useState(RELAY_STREAM_URL);
  const [connected, setConnected] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cacheBuster, setCacheBuster] = useState(0);
  const [useSimulationFeed, setUseSimulationFeed] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const refreshStream = () => {
    setCacheBuster(Date.now());
  };

  useEffect(() => {
    if (useSimulationFeed) return;
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      setConnected(true);
      setError(null);
    };

    const handleError = () => {
      setConnected(false);
      setError("ESP32-CAM offline pada port lokal. Mode simulasi kamera aktif.");
      setUseSimulationFeed(true);
    };

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);

    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, [cacheBuster, useSimulationFeed]);

  return (
    <div
      className={`card overflow-hidden rounded-2xl border border-cs-text/10 bg-white/80 shadow-md backdrop-blur-md transition-all ${
        fullscreen ? "fixed inset-0 z-50 m-0 rounded-none bg-black" : ""
      }`}
    >
      <div className="flex items-center justify-between border-b border-cs-text/10 bg-cs-primary/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cs-blue/10 text-sky-600">
            <Video className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="font-heading text-sm font-bold text-cs-text">
              {useSimulationFeed ? "ESP32-CAM Computer Vision Feed (Simulasi)" : "ESP32-CAM Live Stream"}
            </p>
            <p className="text-xs text-cs-text/50">1280×720 · 30 FPS · ArUco Dict 4x4</p>
          </div>
          <span
            className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
            aria-hidden="true"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUseSimulationFeed(!useSimulationFeed)}
            className="rounded-lg bg-purple-100 px-2.5 py-1 text-xs font-bold text-cs-primaryDeep hover:bg-purple-200"
          >
            {useSimulationFeed ? "Beralih ke Live Port" : "Beralih ke Simulasi"}
          </button>

          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="rounded-lg p-2 text-cs-text/50 hover:bg-cs-text/5 hover:text-cs-text"
            aria-label={fullscreen ? "Keluar fullscreen" : "Fullscreen"}
          >
            {fullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="relative aspect-video min-h-[260px] bg-[#0b1220] overflow-hidden">
        {useSimulationFeed ? (
          /* Simulated Vision Stream with ArUco Detection Bounding Boxes */
          <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-b from-[#090e17] to-[#04060a]">
            {/* Camera Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Smart Tactile Board Outline */}
            <div className="relative h-[80%] w-[85%] rounded-2xl border border-cyan-500/30 bg-[#0f172a]/60 p-4 shadow-2xl backdrop-blur-xs flex flex-col justify-between">
              {/* Telemetry Overlay Header */}
              <div className="flex items-center justify-between font-mono text-[10px] text-cyan-400">
                <span>CV: OpenCV ArUco Detector 4.8.0</span>
                <span>TRACKED_OBJECTS: 3</span>
              </div>

              {/* ArUco Marker Overlays */}
              <div className="grid grid-cols-3 gap-4 my-auto">
                {/* Marker 0: Battery */}
                <div className="relative flex flex-col items-center justify-center rounded-xl border border-amber-400 bg-amber-500/10 p-3">
                  <span className="absolute -top-2.5 left-2 bg-amber-400 text-black px-1.5 py-0.2 rounded text-[9px] font-mono font-bold">
                    ID #0: BATTERY (C3)
                  </span>
                  <div className="h-10 w-10 border-2 border-dashed border-amber-400/80 rounded-lg flex items-center justify-center">
                    <span className="font-mono text-[10px] text-amber-300 font-bold">3.0V</span>
                  </div>
                </div>

                {/* Marker 5: Switch */}
                <div className="relative flex flex-col items-center justify-center rounded-xl border border-sky-400 bg-sky-500/10 p-3">
                  <span className="absolute -top-2.5 left-2 bg-sky-400 text-black px-1.5 py-0.2 rounded text-[9px] font-mono font-bold">
                    ID #5: SWITCH (A2)
                  </span>
                  <div className="h-10 w-10 border-2 border-dashed border-sky-400/80 rounded-lg flex items-center justify-center">
                    <span className="font-mono text-[10px] text-sky-300 font-bold">CLOSED</span>
                  </div>
                </div>

                {/* Marker 1: Lamp */}
                <div className="relative flex flex-col items-center justify-center rounded-xl border border-purple-400 bg-purple-500/10 p-3">
                  <span className="absolute -top-2.5 left-2 bg-purple-400 text-black px-1.5 py-0.2 rounded text-[9px] font-mono font-bold">
                    ID #1: LAMP (B1)
                  </span>
                  <div className="h-10 w-10 border-2 border-dashed border-purple-400/80 rounded-lg flex items-center justify-center">
                    <span className="font-mono text-[10px] text-purple-300 font-bold">ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span className="text-emerald-400">● TARGET CONFIDENCE: 98.7%</span>
                <span>LATENCY: 14ms</span>
              </div>
            </div>
          </div>
        ) : (
          <img
            ref={imgRef}
            src={streamUrl + "?t=" + cacheBuster}
            alt="ESP32-CAM Live Stream"
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
