- [🗺️ Roadmap Pengembangan TaniSoko](#️-roadmap-pengembangan-tanisoko)
  - [🧭 FASE 1 – Fondasi \& Definisi Domain](#-fase-1--fondasi--definisi-domain)
    - [🎯 Tujuan:](#-tujuan)
    - [✅ Task List](#-task-list)
  - [🧱 FASE 2 – Setup Monorepo \& Mock System](#-fase-2--setup-monorepo--mock-system)
    - [🎯 Tujuan:](#-tujuan-1)
    - [✅ Task List](#-task-list-1)
  - [🧩 FASE 3 – Desain Frontend Modular (CDD)](#-fase-3--desain-frontend-modular-cdd)
    - [🎯 Tujuan:](#-tujuan-2)
    - [✅ Task List](#-task-list-2)
  - [🧠 FASE 4 – Rancang \& Implementasi Backend API](#-fase-4--rancang--implementasi-backend-api)
    - [🎯 Tujuan:](#-tujuan-3)
    - [✅ Task List](#-task-list-3)
  - [🔌 FASE 5 – Firmware ESP32 \& Integrasi MQTT](#-fase-5--firmware-esp32--integrasi-mqtt)
    - [🎯 Tujuan:](#-tujuan-4)
    - [✅ Task List](#-task-list-4)
  - [🔗 FASE 6 – Integrasi \& Pengujian End-to-End](#-fase-6--integrasi--pengujian-end-to-end)
    - [🎯 Tujuan:](#-tujuan-5)
    - [✅ Task List](#-task-list-5)
  - [🚀 FASE 7 – Deployment \& Pilot Lapangan](#-fase-7--deployment--pilot-lapangan)
    - [🎯 Tujuan:](#-tujuan-6)
    - [✅ Task List](#-task-list-6)
  - [📘 Tambahan: Versi Lanjutan (Opsional v1.5+)](#-tambahan-versi-lanjutan-opsional-v15)
  - [✨ Penutup](#-penutup)

---

# 🗺️ Roadmap Pengembangan TaniSoko

**TaniSoko** adalah sistem IoT pertanian presisi yang dibangun sebagai hadiah pensiun dan fondasi bisnis utama jangka panjang. Roadmap ini dirancang untuk mewujudkan sistem secara bertahap, modular, dan berorientasi produksi.

---

## 🧭 FASE 1 – Fondasi & Definisi Domain

> ⏳ Minggu 1–2

### 🎯 Tujuan:

Menetapkan visi, cakupan domain, dan struktur data dasar sistem.

### ✅ Task List

- [ ] Menyusun visi dan misi sistem TaniSoko
- [ ] Mendefinisikan vertikal utama:
  - [ ] Hortikultura
  - [ ] Hidroponik
  - [ ] Peternakan (Ayam)
  - [ ] Perikanan
- [ ] Identifikasi aktor sistem:
  - [ ] Petani / Operator
  - [ ] Admin
  - [ ] Node IoT
- [ ] Buat daftar kebutuhan fungsional per domain
- [ ] Rancang Entity-Relationship Diagram (ERD) awal
- [ ] Buat skema awal `Device`, `Sensor`, `Log`, `Actuator`, `User`, `Farm`

---

## 🧱 FASE 2 – Setup Monorepo & Mock System

> ⏳ Minggu 3–4

### 🎯 Tujuan:

Membuat struktur monorepo dan mulai pengembangan frontend berbasis mock.

### ✅ Task List

- [ ] Inisialisasi project monorepo
- [ ] Buat struktur direktori:

```

/firmware
/backend
/frontend
/shared
/mqtt-test
/docs

```

- [ ] Setup tooling awal:
- [ ] `esbuild` untuk frontend
- [ ] `tsconfig.json` shared
- [ ] Git init + .gitignore + README.md
- [ ] Buat mock data `.json` untuk:
- [ ] List sensor
- [ ] Log historis
- [ ] Status perangkat
- [ ] Buat service layer frontend (`services/api.ts`) dengan `fetch()` ke mock

---

## 🧩 FASE 3 – Desain Frontend Modular (CDD)

> ⏳ Minggu 5–6

### 🎯 Tujuan:

Membangun UI berbasis komponen dengan dummy data & simulasi interaksi.

### ✅ Task List

- [ ] Buat komponen dasar:
- [ ] `<device-card>`
- [ ] `<sensor-graph>`
- [ ] `<log-table>`
- [ ] `<control-panel>`
- [ ] Implementasikan state management sederhana (`context` atau prop-passing)
- [ ] Layout responsif dengan Tailwind
- [ ] Setup live preview (dev server)
- [ ] Siapkan halaman:
- [ ] Dashboard
- [ ] Monitoring
- [ ] Kontrol
- [ ] Log Historis

---

## 🧠 FASE 4 – Rancang & Implementasi Backend API

> ⏳ Minggu 7–8

### 🎯 Tujuan:

Membuat server Fastify dengan endpoint REST & MQTT bridge.

### ✅ Task List

- [ ] Setup project backend dengan TypeScript
- [ ] Setup Fastify + Plugin dasar
- [ ] Buat koneksi SQLite + helper fungsi CRUD
- [ ] Implementasi endpoint:
- [ ] `GET /devices`
- [ ] `POST /control`
- [ ] `GET /logs`
- [ ] Tambah MQTT bridge:
- [ ] Subscribe topik sensor
- [ ] Publish ke control topic
- [ ] Tes komunikasi ke MQTT lokal (Mosquitto)

---

## 🔌 FASE 5 – Firmware ESP32 & Integrasi MQTT

> ⏳ Minggu 9–10

### 🎯 Tujuan:

Mengembangkan firmware modular ESP32 dengan komunikasi MQTT aktif.

### ✅ Task List

- [ ] Setup firmware project di Arduino IDE CE
- [ ] Struktur kelas:
- [ ] `SensorManager`
- [ ] `MqttClient`
- [ ] `DeviceController`
- [ ] Implementasi sensor (suhu, kelembaban, TDS)
- [ ] Implementasi kontrol aktuator (relay)
- [ ] Publikasi data ke:
- [ ] `tanisoko/sensor/{device_id}`
- [ ] Subskripsi topik kontrol:
- [ ] `tanisoko/control/{device_id}`
- [ ] Tambah Web Server lokal (SPIFFS) untuk konfigurasi dasar

---

## 🔗 FASE 6 – Integrasi & Pengujian End-to-End

> ⏳ Minggu 11–12

### 🎯 Tujuan:

Menghubungkan seluruh komponen menjadi sistem utuh dan bisa diuji.

### ✅ Task List

- [ ] Frontend ↔ Backend via fetch (real API)
- [ ] Backend ↔ MQTT Broker
- [ ] MQTT ↔ Node ESP32
- [ ] Tes kontrol real-time (pompa, aktuator)
- [ ] Tes historis data log sensor
- [ ] Monitoring: koneksi, uptime, stabilitas
- [ ] Logging ke SQLite

---

## 🚀 FASE 7 – Deployment & Pilot Lapangan

> ⏳ Minggu 13–14

### 🎯 Tujuan:

Menjalankan sistem di lapangan terbatas & dokumentasi deployment.

### ✅ Task List

- [ ] Install stack lengkap di Raspberry Pi:
- [ ] Fastify backend
- [ ] Frontend static
- [ ] Mosquitto MQTT
- [ ] SQLite
- [ ] Setup `systemd` atau `pm2` untuk service otomatis
- [ ] Deploy 1 node ESP32 + sensor + aktuator
- [ ] Pantau 24 jam: stabilitas, kelistrikan, koneksi
- [ ] Catat umpan balik, bug, dan perbaikan

---

## 📘 Tambahan: Versi Lanjutan (Opsional v1.5+)

- [ ] Autentikasi pengguna (JWT)
- [ ] Backup data ke cloud / Firebase
- [ ] Telegram / WhatsApp alert
- [ ] Dashboard multi-lokasi (multi farm)
- [ ] Notifikasi threshold otomatis

---

## ✨ Penutup

Dokumen roadmap ini adalah kompas jangka pendek dan menengah untuk membangun **TaniSoko sebagai pilar digital pertanian modern**.  
Silakan gunakan secara fleksibel, sesuaikan dengan waktu dan sumber daya yang tersedia.

> Diperbarui: Oktober 2025  
> Oleh: Slamet – Pemilik & Arsitek TaniSoko

```

```
