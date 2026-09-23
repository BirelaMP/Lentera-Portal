# LENTERA: Inclusive Science Learning Ecosystem
> **Pendamping Praktikum Sains Adaptif bagi Peserta Didik Tunanetra**
> *Inovasi Teknologi Digital Pendidikan — Finalis LIDM 2026 (Lomba Inovasi Digital Mahasiswa)*

LENTERA adalah ekosistem pembelajaran sains inklusif berbasis kecerdasan buatan (*Artificial Intelligence*) yang mentransformasikan praktikum fisika kelistrikan dari visual murni menjadi pengalaman multimodal yang dapat diraba (*tactile*), didengar (*voice*), dan dipandu secara adaptif oleh AI dengan metode *Explain Before Answer*.

---

## 🌟 5 Inovasi Inti (Core Innovations)

1. **Smart Tactile Experiment Board**: Papan sirkuit magnetik dengan kode Braille Unicode, sensor pendeteksi komponen berbasis *computer vision* (ArUco / ESP32-CAM) dan simulator interaktif zero-localhost.
2. **Context-Aware Learning Engine (CLE)**: Mesin AI kontekstual yang membaca status sensor fisik, mendeteksi miskonsepsi (seperti polaritas terbalik atau sirkuit terbuka), dan menyajikan bimbingan bertahap (*Explain Before Answer*).
3. **Voice & Braille Multimodal Interaction**: Antarmuka suara dwiarah bahasa Indonesia (*Web Speech API*) dengan penegakan ketat kosakata taktil (*raba, rasakan, temukan*) tanpa bias visual.
4. **Tripartite Learning Analytics**: Dasbor analitik terpisah untuk 3 entitas pengguna:
   - **Peserta Didik Tunanetra** (`/student`): Level & XP, Skill Map 6 dimensi, rekomendasi adaptif.
   - **Guru / Pendidik Khusus** (`/teacher`): Tren penguasaan kelas (Recharts), matriks miskonsepsi, pola kesalahan siswa, skor kemandirian (*Independence Score*).
   - **Orang Tua** (`/parent`): Ringkasan waktu praktikum mandiri anak, pencapaian taktil, panduan pendampingan sains di rumah, dan konsultasi AI Parenting.
5. **Digital Tactile Handbook** (`/handbook`): Buku panduan 4 bab kurikulum IPA lengkap dengan pemutar suara teks-ke-suara, panduan eksplorasi sentuhan, dan representasi Braille.

---

## 🧭 Struktur Navigasi & Routing

| Rute URL | Modul & Fungsi |
|---|---|
| `/` | **Landing Page Premium** — Hero section Apple + Linear style, visualizer Smart Board, diagram pipeline AI. |
| `/cle` | **Context-Aware Learning Engine UI** — Telemetri sensor (Baterai, Saklar, Lampu), injeksi skenario kerusakan, diagnosa AI sokratik, audit jejak *Reasoning Timeline*, *Confidence Score*. |
| `/tutor` | **LENTERA AI ASSISTANT** — 4 Mode (Exploration, Troubleshooting, Concept Reflection, Evaluation), kontrol mikrofon & suara TTS, filter kosakata taktil. |
| `/student` | **Dasbor Siswa** — Level 2: Rangkaian Seri (72%), Cognitive Diagnosis Skill Map (Radar Chart), AI Next Recommendation, lencana pencapaian. |
| `/teacher` | **Dasbor Guru** — Visualisasi Recharts (Tren Penguasaan & Pola Kesalahan 42% polaritas), AI Insight: *"5 siswa mengalami pola kesalahan polaritas"*, daftar progres siswa. |
| `/parent` | **Dasbor Orang Tua** — Ringkasan durasi belajar anak, lencana terbaru, tips pendampingan sains inklusif di rumah, fitur Tanya AI Parenting. |
| `/handbook` | **Buku Panduan Digital** — Bab 1 (Komponen), Bab 2 (Seri), Bab 3 (Paralel), Bab 4 (Troubleshooting), pemutar audio narator, toggle kode Braille. |
| `/aruco` | **LENTERA Smart Board Lab** — Deteksi marker ArUco ESP32-CAM dengan *Toggle Mode Simulasi* untuk pengujian tanpa perangkat fisik di cloud. |

---

## ♿ Aksesibilitas WCAG 2.1 AAA

- **Pusat Aksesibilitas (`Alt + A`)**:
  - Tema Kontras Tinggi: *Yellow-on-Black* (rekomendasi Low Vision), *Dark High-Contrast*, *Navy-Blue*.
  - Penskalaan Teks: Standar (100%), Besar (115%), Ekstra Besar (130%).
  - Kecepatan Suara TTS: 0.8x, 1.0x, 1.25x.
  - Pintasan Keyboard Global: `Alt + 1` s/d `Alt + 7` untuk navigasi cepat antar halaman.
  - Skip link aksesibel untuk pengguna pembaca layar (*screen reader*).

---

## 🚀 Menjalankan Secara Lokal

Pastikan telah terpasang **Node.js 18+** atau **Node.js 20+**:

```bash
# 1. Masuk ke direktori
cd Lentera-Portal-main

# 2. Pasang dependensi
npm install

# 3. Jalankan server pengembangan
npm run dev

# 4. Buka di browser
http://localhost:3000
```

---

## ☁️ Deploy ke Netlify

Proyek ini telah dikonfigurasi dengan `netlify.toml` dan siap dideploy langsung ke Netlify:

```bash
# Uji build lokal terlebih dahulu
npm run build
```

1. Hubungkan repositori GitHub ke Netlify.
2. Netlify secara otomatis mendeteksi plugin Next.js (`@netlify/plugin-nextjs`).
3. (Opsional) Pasang environment variable `GROQ_API_KEY` jika ingin mengaktifkan inferensi LLaMA 3.3 70B. *(Sistem memiliki automatic deterministic CLE fallback jika API key tidak diset)*.
4. Klik **Deploy**.

---

## 📄 Dokumen Kompetisi LIDM

Silakan baca file [`DOCUMENTATION_LIDM_2026.md`](./DOCUMENTATION_LIDM_2026.md) untuk melihat:
- Naskah Skenario Demo 5 Menit untuk Dewan Juri LIDM.
- Pemetaan Inovasi terhadap Rubrik Penilaian LIDM 2026 (Novelty, Inklusif, Kematangan Teknologi, UI/UX).
- Rincian Arsitektur Teknis.
