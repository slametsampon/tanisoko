- [🌱 TaniSoko – Pilar Digital Pertanian Modern](#-tanisoko--pilar-digital-pertanian-modern)
  - [🎯 Visi](#-visi)
  - [🧰 Teknologi yang Digunakan](#-teknologi-yang-digunakan)
    - [⚛️ Frontend](#️-frontend)
    - [🔧 Backend](#-backend)
    - [📡 IoT Node](#-iot-node)
    - [🛠️ Tools \& DevOps](#️-tools--devops)
  - [🧱 Arsitektur Sistem TaniSoko](#-arsitektur-sistem-tanisoko)
    - [1. 🔌 Firmware Node (ESP32)](#1--firmware-node-esp32)
    - [2. 🖧 Server \& Komunikasi (Raspberry Pi)](#2--server--komunikasi-raspberry-pi)
    - [3. 🧑‍💻 Antarmuka Pengguna (HMI)](#3--antarmuka-pengguna-hmi)
  - [🌐 Domain \& Branding](#-domain--branding)
  - [✅ Keunggulan TaniSoko](#-keunggulan-tanisoko)
  - [✨ Penutup](#-penutup)

---

# 🌱 TaniSoko – Pilar Digital Pertanian Modern

**TaniSoko** adalah sistem pertanian presisi berbasis IoT yang dirancang untuk membantu petani dan pengelola lahan dalam memantau serta mengontrol kondisi lingkungan secara real-time. Sistem ini menggabungkan teknologi **edge-computing**, **komunikasi dua arah**, dan **arsitektur modular** untuk mendukung keberlanjutan dan efisiensi di sektor agrikultur.

## 🎯 Visi

> Menjadi fondasi digital pertanian Indonesia yang cerdas, efisien, dan berkelanjutan melalui pemanfaatan teknologi terbuka dan terintegrasi.

---

## 🧰 Teknologi yang Digunakan

### ⚛️ Frontend

- **Framework:** LitElement (Web Components)
- **Styling:** Tailwind CSS (inline class)
- **Build Tool:** esbuild
- **Arsitektur UI:** Component-Driven Development (CDD)

### 🔧 Backend

- **Platform:** Node.js + TypeScript
- **Framework:** Fastify
- **API:** RESTful + MQTT Bridge
- **Database:** SQLite (embedded, local)

### 📡 IoT Node

- **Device:** ESP32
- **Firmware:** Arduino C++ (OOP)
- **Protocol:** MQTT (Publish/Subscribe)
- **Transport:** WiFi

### 🛠️ Tools & DevOps

- **Hosting:** Raspberry Pi 4 (all-in-one deployment)
- **MQTT Broker:** Mosquitto
- **Source Control:** GitHub
- **IDE:** Visual Studio Code + Arduino CE

---

## 🧱 Arsitektur Sistem TaniSoko

TaniSoko dirancang dengan pendekatan **Separation of Concern (SoC)** untuk menjaga modularitas dan skalabilitas, memisahkan sistem ke dalam tiga lapisan utama:

### 1. 🔌 Firmware Node (ESP32)

- Bahasa: C++ (Object-Oriented)
- IDE: Arduino IDE + Arduino Community Edition
- Komunikasi: MQTT (Pub/Sub), HTTP (AJAX) – opsional
- Penyimpanan: SPIFFS / LittleFS
- Fitur: Web Server lokal untuk konfigurasi & status

### 2. 🖧 Server & Komunikasi (Raspberry Pi)

- Fungsi: Pusat komunikasi & komputasi edge
- Menjalankan: Mosquitto MQTT Broker
- Hosting: Web UI berbasis LitElement
- Bridge: MQTT ↔ WebSocket (untuk frontend real-time)
- Fitur: Offline capability, jaringan lokal & remote

### 3. 🧑‍💻 Antarmuka Pengguna (HMI)

- Framework: LitElement (Web Components)
- Styling: Tailwind CSS
- Koneksi: MQTT over WebSocket ke Raspberry Pi
- Build Tool: esbuild
- Deployment: GitHub Pages / Raspberry Pi Static Hosting

---

## 🌐 Domain & Branding

- **Brand Name:** TaniSoko
- **Makna:** “Tani” (pertanian) + “Soko” (tiang/fondasi) → Pilar digital pertanian.
- **Rekomendasi Domain:** `tanisoko.id`, `tanisoko.com`, `app.tanisoko.id`
- **Social Handle:** `@tanisoko` (untuk konsistensi branding)

---

## ✅ Keunggulan TaniSoko

- 🌾 Fokus pada pertanian presisi & efisiensi
- 🔌 Real-time monitoring dan control melalui MQTT
- 📶 Edge-server berbasis Raspberry Pi
- 🧩 Modular dan open-source
- 🧠 Dirancang untuk keberlanjutan & ekspansi skala besar

---

## ✨ Penutup

Terima kasih telah bergabung dalam perjalanan kami membangun masa depan pertanian Indonesia yang lebih cerdas dan berdaya saing.  
Mari bersama membangun **ekosistem teknologi agribisnis** yang tangguh dan adaptif melalui **TaniSoko** — _Pilar Digital Pertanian Modern_.

> **GitHub:** [github.com/tanisoko](https://github.com/tanisoko) _(placeholder, sesuaikan dengan repo Anda)_  
> **Kontak:** `info@tanisoko.id` _(placeholder email, ubah sesuai kebutuhan)_
