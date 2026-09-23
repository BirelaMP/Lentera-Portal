# DOKUMENTASI RESMI PRODUK INOVASI: LENTERA
## LOMBA INOVASI DIGITAL MAHASISWA (LIDM) 2026
### Divisi: Inovasi Teknologi Digital Pendidikan

---

## 1. Identitas Produk & Ringkasan Eksekutif

- **Nama Produk**: **LENTERA** (*Inclusive Science Learning Ecosystem*)
- **Tagline**: *"Pendamping Praktikum Sains Adaptif bagi Peserta Didik Tunanetra"*
- **Target Pengguna**: 
  1. Peserta Didik Tunanetra & *Low Vision* (Tingkat SMPLB / Sekolah Inklusi)
  2. Guru / Pendidik Khusus
  3. Orang Tua Peserta Didik
- **Landasan Hukum & Kebijakan**:
  - UU No. 8 Tahun 2016 tentang Penyandang Disabilitas (Hak Akses Pendidikan & Teknologi).
  - Permendikbudristek No. 48 Tahun 2023 tentang Akomodasi yang Layak untuk Peserta Didik Penyandang Disabilitas.
  - SDG 4: *Quality & Inclusive Education*.

---

## 2. Lima Inovasi Inti (Core Innovations)

### 1. Smart Tactile Experiment Board
- **Deskripsi**: Papan praktikum modular dengan dudukan magnetik berkode Braille Unicode dan pola taktil timbul. Dilengkapi marker ArUco yang dibaca oleh modul *computer vision* (ESP32-CAM) atau simulator sirkuit taktil digital.
- **Kebaruan (Novelty)**: Memindahkan praktikum listrik yang selama ini 100% bergantung pada penglihatan (warna lampu, jarum multimeter) menjadi praktikum berbasis rabaan fisik dan haptik.

### 2. Context-Aware Learning Engine (CLE)
- **Deskripsi**: *Inference engine* AI berbasis aturan & model bahasa (LLM) yang membaca status sensor riil (tegangan, arus, keterhubungan loop, orientasi kutub komponen).
- **Pedagogi *Explain Before Answer***: AI **tidak langsung** memberikan kunci jawaban atau menyuruh "putar lampu ke kanan". AI mengajukan pertanyaan sokratik bertahap:
  1. *Langkah 1 (Observasi Taktil)*: "Coba raba tanda positif dan negatif pada komponen lampu."
  2. *Langkah 2 (Penalaran Konsep)*: "Ingatkah kamu bagaimana arus searah mengalir dari kutub positif?"
  3. *Langkah 3 (Tindakan Koreksi Mandiri)*: "Putar dudukan balok lampu 180 derajat pada kisi D1."

### 3. Voice & Braille Multimodal Interaction
- **Deskripsi**: Antarmuka suara dwiarah (*Web Speech API*) dan penegakan kosakata taktil ketat.
- **Pembersihan Bias Visual**: Sistem secara aktif melarang frasa visual seperti *"lihat gambar"*, *"perhatikan warna kabel"*, dan menggantinya dengan *"raba alur kabel"*, *"rasakan kehangatan bohlam"*, *"dengarkan bunyi klik saklar"*.

### 4. Tripartite Learning Analytics (Siswa, Guru, Orang Tua)
- **Dasbor Siswa**: Pengukuran *Cognitive Diagnosis* 6 dimensi (Radar Chart), tingkat penguasaan Level 2 (72%), XP Ring, serta rekomendasi adaptif otomatis.
- **Dasbor Guru**: Grafik tren penguasaan kelas (*AreaChart*), distribusi pola kesalahan (*BarChart*), deteksi dini miskonsepsi (misal: 5 siswa salah polaritas), dan *Independence Score*.
- **Dasbor Orang Tua**: Pemantauan durasi praktikum mandiri, lencana pencapaian, panduan mendampingi anak tunanetra bereksperimen dengan benda rumah tangga, serta fitur konsultasi AI Parenting.

### 5. Digital Tactile Handbook
- **Deskripsi**: Modul digital 4 bab kurikulum IPA (Komponen Listrik, Rangkaian Seri, Rangkaian Paralel, Troubleshooting & Keselamatan) yang dilengkapi pemutar suara otomatis (*Text-to-Speech*), panduan eksplorasi rabaan, dan representasi simbol Braille.

---

## 3. Skenario Demo 5 Menit untuk Dewan Juri LIDM 2026

| Waktu | Bagian Demo | Narasi & Aksi Penguji / Presenter | Fitur yang Ditampilkan |
|---|---|---|---|
| **00:00 - 01:00** | **Problem Statement & Landing Page** | *"Selamat pagi Dewan Juri. Selama puluhan tahun, siswa tunanetra tidak bisa praktikum listrik mandiri karena semua alat uji bersifat visual. LENTERA hadir mentransformasikan praktikum sains menjadi pengalaman taktil, audio, dan AI adaptif."* Buka Beranda (`/`), tunjukkan estetika Apple+Linear, uji visualizer Smart Board, dan tekan tombol suara. | Hero Section, Smart Board Visualizer, Navigasi Ekosistem (`/`) |
| **01:01 - 02:15** | **Live Demo: Context-Aware Learning Engine (CLE)** | *"Mari kita uji inovasi inti kami di Lab CLE (`/cle`). Kita simulasikan siswa salah memasang polaritas lampu."* Klik skenario **Kesalahan Polaritas Lampu Terbalik**. Tunjukkan bagaimana sensor mendeteksi `Wrong Polarity`. Tekan tombol **Dengarkan Diagnosis (TTS)**. Tunjukkan metode *Explain Before Answer* (Petunjuk 1 → Petunjuk 2 → Solusi) beserta *Reasoning Timeline* dan *Confidence Score 97.4%*. | Halaman `/cle`, Sensor Telemetry, Scaffolding 3-Langkah, Reasoning Audit |
| **02:16 - 03:15** | **Interaksi LENTERA AI ASSISTANT** | *"Sekarang kita buka LENTERA AI ASSISTANT (`/tutor`). AI ini bukan chatbot biasa. Ada 4 mode: Exploration, Troubleshooting, Reflection, Evaluation."* Pilih **Troubleshooting Mode**, ketik/ucapkan dengan mic: *"Lampu saya mati, bagaimana cara memperbaikinya?"*. Dengarkan AI menjawab dengan kosakata taktil *"raba dudukan komponen di kisi B1..."* tanpa sepatah kata pun menyebut visual. | Halaman `/tutor`, Voice Mic, Mode Switcher, Filter Kosakata Taktil |
| **03:16 - 04:15** | **Tripartite Analytics: Siswa, Guru, & Orang Tua** | *"Inovasi kami menghubungkan tiga pilar pendidikan."* Buka `/student` (tunjukkan Level 2 Series Circuit 72%, Radar Skill Map 6 dimensi). Pindah ke `/teacher` (tunjukkan Recharts tren kemandirian kelas dan insight AI: *'5 siswa mengalami pola kesalahan polaritas'*). Buka `/parent` (tunjukkan tips pendampingan sains inklusif di rumah). | Halaman `/student`, `/teacher`, `/parent`, Recharts Library |
| **04:16 - 05:00** | **Aksesibilitas WCAG AAA & Penutup** | Tekan tombol **Alt+A** untuk membuka **Pusat Aksesibilitas**. Ganti tema ke **Kuning-Hitam (High Contrast Low Vision)**, ubah skala teks ke Ekstra Besar (130%), dan buka Buku Panduan Digital (`/handbook`). *"LENTERA siap dideploy dan siap mewujudkan pendidikan sains setara dan mandiri bagi seluruh anak bangsa. Terima kasih."* | Modal Aksesibilitas, Mode Kontras Tinggi, `/handbook` |

---

## 4. Pemetaan Kriteria Penilaian LIDM 2026

| Kriteria Penilaian LIDM | Bobot | Implementasi Nyata pada LENTERA |
|---|---|---|
| **1. Kebaruan & Inovasi (Novelty)** | **30%** | Menggabungkan papan taktil fisik (ArUco/ESP32-CAM) dengan Context-Aware Learning Engine beralgoritma *Explain Before Answer*. Menghilangkan ketergantungan penglihatan pada praktikum sains listrik. |
| **2. Kemanfaatan & Dampak Inklusif** | **25%** | Menyasar peserta didik disabilitas netra (SMPLB & Sekolah Inklusi) yang selama ini termarjinalkan dalam pembelajaran STEM. Memenuhi UU Disabilitas No 8/2016 dan target SDG 4. |
| **3. Kematangan Teknologi & Desain Sistem** | **25%** | Arsitektur Next.js 15 App Router, TypeScript ketat, visualisasi data interaktif Recharts, Web Speech API (suara & mic), zero-localhost failover, dan audit trail reasoning timeline AI. |
| **4. Kualitas Antarmuka & Aksesibilitas (UI/UX)** | **20%** | Desain berkelas Apple + Linear EdTech dengan palet ungu (`#7C3AED`), biru, dan hijau emerald. Memenuhi standar WCAG 2.1 AAA dengan tema kontras tinggi ramah *low vision*, penskalaan teks, dan navigasi keyboard penuh. |

---

## 5. Panduan Deployment ke Netlify (Langkah Cepat)

Proyek ini telah dilengkapi dengan `netlify.toml` dan telah divalidasi dengan `npm run build` berhasil 100% tanpa error.

### Cara 1: Deploy Langsung via GitHub / Netlify Git (Direkomendasikan)
1. Push repositori ini ke GitHub / GitLab pribadi Anda.
2. Buka [https://app.netlify.com](https://app.netlify.com).
3. Klik **"Add new site"** → **"Import an existing project"**.
4. Pilih repositori `Lentera-Portal-main`.
5. Netlify akan otomatis membaca file `netlify.toml`:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
6. (Opsional) Jika ingin menggunakan model AI Groq LLaMA 3.3 70B, tambahkan *Environment Variable*:
   - Key: `GROQ_API_KEY`
   - Value: `<API_KEY_GROQ_ANDA>`
   *(Catatan: Jika tidak diisi, LENTERA secara otomatis menggunakan Deterministic CLE Reasoning Engine bawaan sehingga demo juri tetap berjalan lancar tanpa error).*
7. Klik **"Deploy Site"**. Website akan aktif dalam 1-2 menit!

### Cara 2: Deploy Manual via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --prod
```
