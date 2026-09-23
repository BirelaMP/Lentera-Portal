"use client";

import Link from "next/link";
import { ArrowLeft, ScanEye } from "lucide-react";
import CircuitDiagram from "@/components/aruco/CircuitDiagram";
import ArUcoDetector from "@/components/aruco/ArUcoDetector";
import CameraStream from "@/components/aruco/CameraStream";

const wiringPoints = [
  {
    title: "ESP32-CAM",
    text: "Pusat kontrol utama yang membaca kamera dan mengirim data ke website.",
  },
  {
    title: "Catu Daya",
    text: "Adaptor / baterai masuk ke jalur power agar modul tetap stabil.",
  },
  {
    title: "Kamera + IoT",
    text: "Gambar diproses lalu tampil sebagai visual proyek di web.",
  },
];

export default function ArucoPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-cs-bg font-body text-cs-text">
      {/* side-only ambient glow, consistent with the rest of Lentera */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="blob1 absolute -left-32 top-[-3rem] h-72 w-72 rounded-full blur-3xl md:h-96 md:w-96"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.16), transparent 70%)" }}
        />
        <div
          className="blob2 absolute -right-32 bottom-[-4rem] h-72 w-72 rounded-full blur-3xl md:h-96 md:w-96"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)" }}
        />
      </div>

      <section className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-5 py-8 lg:px-10 lg:py-10">
        {/* top bar: back to portal + brand pill, same recipe as the dashboard topbar */}
        <div className="rise flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-cs-text/10 bg-white/70 px-5 py-3.5 shadow-[0_10px_30px_rgba(46,42,94,0.06)] backdrop-blur-md">
          <Link
            href="/"
            prefetch
            className="navitem flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm font-bold text-cs-text/70 hover:bg-cs-text/5 hover:text-cs-primaryDeep"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
            Portal Lentera
          </Link>
          <span className="flex items-center gap-2 rounded-full bg-cs-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cs-primaryDeep">
            <ScanEye className="h-3.5 w-3.5" strokeWidth={2.4} />
            ESP32-CAM + Deteksi ArUco
          </span>
        </div>

        <div className="grid flex-1 gap-8 lg:grid-cols-2">
          {/* Left: Camera + ArUco Detection */}
          <div className="space-y-6">
            <div className="rise space-y-4" style={{ animationDelay: ".05s" }}>
              <p className="inline-flex rounded-full border border-cs-blue/30 bg-cs-blue/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-sky-600">
                Real-time Camera + ArUco Detection
              </p>
              <h1 className="font-heading text-3xl font-extrabold leading-tight text-cs-text md:text-4xl">
                Deteksi komponen sirkuit secara real-time.
              </h1>
              <p className="max-w-xl text-base leading-7 text-cs-text/65">
                Sistem membaca marker ArUco dari kamera, mengenali komponen, dan menampilkan
                status kelengkapan sirkuit secara langsung di dashboard ini.
              </p>
            </div>

            <CameraStream />
            <ArUcoDetector />
          </div>

          {/* Right: Circuit Diagram */}
          <div className="rise" style={{ animationDelay: ".1s" }}>
            <div className="card rounded-[2rem] border border-cs-text/10 bg-white/80 p-5 shadow-[0_18px_50px_-20px_rgba(124,58,237,0.25)] backdrop-blur-xl md:p-7">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-cs-primaryDeep/70">
                    Circuit View
                  </p>
                  <h2 className="font-heading text-xl font-extrabold text-cs-text">
                    Bentuk sirkuit proyek
                  </h2>
                </div>
                <span className="rounded-full border border-cs-green/40 bg-cs-green/10 px-3 py-1 text-xs font-bold text-emerald-600">
                  Live diagram
                </span>
              </div>

              <div className="rounded-2xl bg-[#0b1220] p-4">
                <CircuitDiagram />
              </div>

              <div className="mt-6 space-y-3">
                {wiringPoints.map((item) => (
                  <article
                    key={item.title}
                    className="card rounded-2xl border border-cs-text/10 bg-white p-4 shadow-[0_8px_24px_rgba(46,42,94,0.06)]"
                  >
                    <h3 className="font-heading text-sm font-extrabold text-cs-text">{item.title}</h3>
                    <p className="mt-1 text-[13px] leading-6 text-cs-text/65">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
