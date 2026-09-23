"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles, Eye, Volume2, Menu, X, ChevronDown, Cpu, BookOpen,
  GraduationCap, Users, HeartHandshake, Bot, ScanEye, ArrowUpRight,
} from "lucide-react";
import AccessibilityCenter from "./AccessibilityCenter";
import VoiceCommandCenter from "./VoiceCommandCenter";
import ReviewerDemoModal from "./ReviewerDemoModal";
import { Mic } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accOpen, setAccOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [isReadingPage, setIsReadingPage] = useState(false);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.key === "1") window.location.href = "/";
        else if (e.key === "2") window.location.href = "/cle";
        else if (e.key === "3") window.location.href = "/tutor";
        else if (e.key === "4") window.location.href = "/student";
        else if (e.key === "5") window.location.href = "/teacher";
        else if (e.key === "6") window.location.href = "/parent";
        else if (e.key === "7") window.location.href = "/handbook";
        else if (e.key.toLowerCase() === "a") {
          e.preventDefault();
          setAccOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/cle", label: "Lab CLE (AI Engine)", badge: "Core AI" },
    { href: "/tutor", label: "AI Assistant", badge: "Voice" },
    { href: "/handbook", label: "Buku Digital" },
    { href: "/aruco", label: "Smart Board" },
  ];

  const roleLinks = [
    { href: "/student", label: "Peserta Didik", sub: "Progress & Skill Map", icon: GraduationCap, color: "text-purple-600" },
    { href: "/teacher", label: "Guru / Pengajar", sub: "Analytics & Error Pattern", icon: Users, color: "text-blue-600" },
    { href: "/parent", label: "Orang Tua", sub: "Monitoring & Home Guide", icon: HeartHandshake, color: "text-emerald-600" },
  ];

  const readPageAloud = () => {
    if (!("speechSynthesis" in window)) return;
    if (isReadingPage) {
      window.speechSynthesis.cancel();
      setIsReadingPage(false);
      return;
    }

    const currentTitle = document.title || "Lentera Inclusive Science Learning Ecosystem";
    const mainText = document.querySelector("main")?.innerText.slice(0, 300) || "";
    const announce = `Halaman saat ini: ${currentTitle}. ${mainText}`;

    window.speechSynthesis.cancel();
    setIsReadingPage(true);
    const utter = new SpeechSynthesisUtterance(announce);
    utter.lang = "id-ID";
    utter.rate = parseFloat(localStorage.getItem("lentera_speech_rate") || "1.0");
    utter.onend = () => setIsReadingPage(false);
    utter.onerror = () => setIsReadingPage(false);
    window.speechSynthesis.speak(utter);
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Lewati ke Konten Utama (Skip to Content)
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-white/60 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 shadow-md shadow-purple-500/30 transition group-hover:scale-105">
                <img src="/logo-lentera.png" alt="Logo LENTERA" className="h-7 w-7 object-contain" />
              </div>
              <div>
                <span className="font-heading text-lg font-black tracking-tight text-cs-text">
                  LENTERA
                </span>
                <span className="ml-2 hidden rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-700 sm:inline-block">
                  LIDM 2026
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi Utama">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                    active
                      ? "bg-purple-100/80 text-cs-primaryDeep shadow-xs"
                      : "text-cs-textSoft hover:bg-black/5 hover:text-cs-text"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  {link.badge && (
                    <span className="rounded-md bg-purple-600 px-1.5 py-0.2 text-[9px] font-extrabold uppercase tracking-wider text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Portal Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                  pathname.startsWith("/student") || pathname.startsWith("/teacher") || pathname.startsWith("/parent")
                    ? "bg-purple-100 text-cs-primaryDeep"
                    : "text-cs-textSoft hover:bg-black/5 hover:text-cs-text"
                }`}
                aria-expanded={roleDropdownOpen}
                aria-haspopup="true"
              >
                <span>Dashboard Peran</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/80 bg-white/95 p-2 shadow-xl backdrop-blur-xl"
                  role="menu"
                >
                  {roleLinks.map((role) => (
                    <Link
                      key={role.href}
                      href={role.href}
                      onClick={() => setRoleDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-purple-50"
                      role="menuitem"
                    >
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 ${role.color}`}>
                        <role.icon className="h-4 w-4" />
                      </span>
                      <div className="text-left">
                        <div className="text-xs font-bold text-cs-text">{role.label}</div>
                        <div className="text-[10px] text-cs-textSoft">{role.sub}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Action Tools: Voice Command, Demo LIDM, Accessibility, Audio */}
          <div className="flex items-center gap-2">
            {/* Demo LIDM Mode Button (Reviewer Mode) */}
            <button
              onClick={() => setDemoModalOpen(true)}
              className="flex h-9 items-center gap-1.5 rounded-xl border border-purple-300 bg-gradient-to-r from-purple-100 to-indigo-50 px-3 text-xs font-black text-cs-primaryDeep shadow-xs hover:border-purple-500 hover:shadow-md transition"
              title="Mode Presentasi Juri 5 Menit LIDM"
            >
              <Sparkles className="h-3.5 w-3.5 text-cs-primaryDeep animate-spin" style={{ animationDuration: "8s" }} />
              <span className="hidden sm:inline">Demo LIDM Mode</span>
              <span className="sm:hidden">Demo</span>
            </button>

            {/* Voice Command Center Trigger */}
            <button
              onClick={() => setVoiceOpen(true)}
              aria-label="Navigasi Suara Hands-free"
              title="Perintah Suara (Voice Command Center)"
              className="flex h-9 items-center gap-1.5 rounded-xl bg-purple-50 px-3 text-xs font-bold text-cs-primaryDeep hover:bg-purple-100 transition"
            >
              <Mic className="h-4 w-4 text-cs-primaryDeep" />
              <span className="hidden lg:inline">Perintah Suara</span>
            </button>

            {/* Audio narrator button */}
            <button
              onClick={readPageAloud}
              aria-label={isReadingPage ? "Hentikan pembacaan layar" : "Bacakan ringkasan halaman"}
              title="Bacakan Halaman Ini (TTS)"
              className={`flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-bold transition ${
                isReadingPage
                  ? "bg-amber-400 text-black shadow-md animate-pulse"
                  : "bg-gray-100 text-cs-textSoft hover:bg-gray-200"
              }`}
            >
              <Volume2 className="h-4 w-4" />
              <span className="hidden xl:inline">{isReadingPage ? "Membaca..." : "Dengarkan"}</span>
            </button>

            {/* Accessibility Center Trigger */}
            <button
              onClick={() => setAccOpen(true)}
              aria-label="Buka Pusat Aksesibilitas (Pintasan Alt+A)"
              title="Aksesibilitas Disabilitas Netra (Alt+A)"
              className="flex h-9 items-center gap-1.5 rounded-xl border border-purple-200 bg-white px-3 text-xs font-bold text-cs-primaryDeep shadow-xs hover:border-purple-400 hover:bg-purple-50"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Aksesibilitas</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu navigasi"}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-cs-text md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Panel */}
        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white/95 px-5 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-bold text-cs-text hover:bg-purple-50"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="rounded bg-purple-600 px-1.5 py-0.5 text-[10px] text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}

              <div className="my-2 border-t border-gray-100 pt-2 text-xs font-bold text-cs-textSoft">
                Dashboard Peran
              </div>
              {roleLinks.map((role) => (
                <Link
                  key={role.href}
                  href={role.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-cs-text hover:bg-purple-50"
                >
                  <role.icon className={`h-4 w-4 ${role.color}`} />
                  <span>{role.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Global Accessibility Center Modal */}
      <AccessibilityCenter isOpen={accOpen} onClose={() => setAccOpen(false)} />

      {/* Voice Command Center Modal */}
      <VoiceCommandCenter
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onTriggerAccessibility={() => setAccOpen(true)}
        onTriggerDemoLIDM={() => setDemoModalOpen(true)}
      />

      {/* Reviewer Demo LIDM Mode Modal */}
      <ReviewerDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </>
  );
}
