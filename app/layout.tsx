import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "LENTERA — Pendamping Praktikum Sains Adaptif bagi Peserta Didik Tunanetra",
  description:
    "Ekosistem pembelajaran sains inklusif berbasis AI untuk peserta didik tunanetra dengan Smart Tactile Board dan Context-Aware Learning Engine (LIDM 2026).",
  icons: {
    icon: "/logo-lentera.png",
    shortcut: "/logo-lentera.png",
    apple: "/logo-lentera.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-cs-bg font-body text-cs-text antialiased">
        <Navbar />
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
