"use client";

import { useEffect, useState } from "react";

export default function CircuitDiagram() {
  const [state, setState] = useState({ isBattery: false, isLamp: false, isSwitch: false, isComplete: false });

  useEffect(() => {
    const handleUpdate = (e: Event) => setState((e as CustomEvent).detail);
    window.addEventListener("circuit-update", handleUpdate);
    return () => window.removeEventListener("circuit-update", handleUpdate);
  }, []);

  const wireStroke = state.isComplete ? "url(#wireGradient)" : "#334155";
  const dimColor = "#334155";

  return (
    <svg viewBox="0 0 500 260" className="h-auto w-full overflow-visible" role="img">
      <defs>
        <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur2" />
          <feMerge><feMergeNode in="blur2" /><feMergeNode in="blur1" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="bulbGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* BACKGROUND WIRE (Loop) */}
      <path
        d="M 70,60 L 430,60 A 30,30 0 0,1 460,90 L 460,170 A 30,30 0 0,1 430,200 L 70,200 A 30,30 0 0,1 40,170 L 40,90 A 30,30 0 0,1 70,60 Z"
        fill="none" stroke={wireStroke} strokeWidth="6" strokeLinecap="round"
        filter={state.isComplete ? "url(#neonGlow)" : ""} className="transition-all duration-700 ease-in-out"
      />

      {/* SWITCH COMPONENT (Kanan - Area A2) */}
      <g className="transition-all duration-500">
        <rect x="440" y="110" width="40" height="40" fill="#0b1220" />
        <circle cx="460" cy="110" r="5" fill={state.isSwitch ? "#ec4899" : dimColor} />
        <circle cx="460" cy="150" r="5" fill={state.isSwitch ? "#ec4899" : dimColor} />
        <line x1="460" y1="110" x2={state.isComplete ? 460 : 445} y2={150} stroke={state.isSwitch ? "#ec4899" : dimColor} strokeWidth="4" strokeLinecap="round" className="transition-all duration-500 origin-[460px_110px]" />
        <text x="400" y="135" fill={state.isSwitch ? "#ec4899" : dimColor} fontSize="12" className="font-mono transition-colors">SAKLAR</text>
      </g>

      {/* BATTERY COMPONENT (Atas - Area B3/C3) */}
      <g className="transition-all duration-500">
        <rect x="220" y="40" width="60" height="40" fill="#0b1220" />
        <rect x="220" y="42" width="60" height="36" rx="6" fill="#0b1220" stroke={state.isBattery ? "#c084fc" : dimColor} strokeWidth="4" />
        <line x1="240" y1="50" x2="240" y2="70" stroke={state.isBattery ? "#c084fc" : dimColor} strokeWidth="4" strokeLinecap="round" />
        <line x1="260" y1="55" x2="260" y2="65" stroke={state.isBattery ? "#c084fc" : dimColor} strokeWidth="4" strokeLinecap="round" />
        <text x="240" y="35" fill={state.isBattery ? "#c084fc" : dimColor} fontSize="22" fontWeight="bold" textAnchor="middle" className="transition-colors">+</text>
        <text x="250" y="100" fill={state.isBattery ? "#c084fc" : dimColor} fontSize="12" textAnchor="middle" className="font-mono transition-colors">BATERAI</text>
      </g>

      {/* LAMP COMPONENT (Bawah - Area B1/C1) */}
      <g className="transition-all duration-500">
        <circle cx="250" cy="200" r="30" fill="#0b1220" />
        <circle cx="250" cy="200" r="22" fill={state.isComplete ? "#fef08a" : "#0b1220"} stroke={state.isLamp ? (state.isComplete ? "#eab308" : "#fbbf24") : dimColor} strokeWidth="4" filter={state.isComplete ? "url(#bulbGlow)" : ""} className="transition-all duration-500" />
        <path d="M 240 190 L 260 210 M 260 190 L 240 210" stroke={state.isLamp ? (state.isComplete ? "#ca8a04" : "#fbbf24") : dimColor} strokeWidth="4" strokeLinecap="round" />
        <text x="250" y="245" textAnchor="middle" fill={state.isLamp ? "#fbbf24" : dimColor} fontSize="12" className="font-mono transition-colors">LAMPU</text>
      </g>
    </svg>
  );
}