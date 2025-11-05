- [🗺️ Roadmap Pengembangan TaniSoko](#️-roadmap-pengembangan-tanisoko)
  - [🧭 FASE 1 – Fondasi \& Definisi Domain](#-fase-1--fondasi--definisi-domain)
    - [🎯 Tujuan:](#-tujuan)
    - [✅ Task List](#-task-list)
  - [✅ **FASE 2 – Setup Monorepo \& Mock System (Update)**](#-fase-2--setup-monorepo--mock-system-update)
    - [🎯 Tujuan:](#-tujuan-1)
    - [✅ Task List](#-task-list-1)
  - [🧩 FASE 3 – Desain Frontend Modular (CDD)](#-fase-3--desain-frontend-modular-cdd)
    - [🎯 Tujuan:](#-tujuan-2)
    - [✅ Task List](#-task-list-2)
  - [✅ **FASE 4 – Rancang \& Implementasi Backend API (Update)**](#-fase-4--rancang--implementasi-backend-api-update)
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

## ✅ **FASE 2 – Setup Monorepo & Mock System (Update)**

> ⏳ Minggu 3–4

### 🎯 Tujuan:

Membuat struktur monorepo dan mulai pengembangan mock system dengan simulasi backend–MQTT–frontend (tanpa ESP).

### ✅ Task List

- [x] Inisialisasi project monorepo (`npm init -w`)

- [x] Buat struktur direktori:

  ```txt
  /firmware         # ESP32 (belum digunakan)
  /backend          # Fastify + MQTT (publish dummy)
  /frontend         # LitElement + Tailwind + esbuild
  /shared           # (opsional) Type definisi bersama
  /mqtt-test        # Skrip MQTT CLI, playground
  /docs             # Dokumentasi
  ```

- [x] Setup tooling awal:

  - [x] `esbuild` untuk frontend
  - [x] `tsconfig.base.json` untuk shared base
  - [x] Git init + .gitignore + README.md

- [x] Setup broker MQTT lokal (Mosquitto)

  - [x] Aktifkan `listener 9001` untuk WebSocket
  - [x] Test dengan `mosquitto_pub` / `mosquitto_sub`

- [x] Buat mock publisher MQTT di `backend/src/mqtt/publisher.ts`

- [x] Setup client MQTT di frontend (`services/mqtt-client.ts`)

- [x] Uji subscribe data dummy di UI

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

## ✅ **FASE 4 – Rancang & Implementasi Backend API (Update)**

> ⏳ Minggu 7–8

### 🎯 Tujuan:

Mengembangkan backend Fastify sebagai bridge API dan penghasil data dummy via MQTT.

### ✅ Task List

- [x] Setup project backend dengan TypeScript + `mqtt`

- [x] Struktur modular:

  ```txt
  backend/
  ├── src/
  │   ├── api/               # REST route handler
  │   ├── mqtt/
  │   │   ├── client.ts      # MQTT koneksi ke broker
  │   │   ├── publisher.ts   # Simulasi publish sensor
  │   │   └── subscriber.ts  # (opsional) log ke DB
  │   ├── db/                # SQLite helper
  │   ├── config/            # Konfigurasi topic, env
  │   └── index.ts           # Fastify entry
  ```

- [x] Implementasi MQTT publisher:

  - Publish ke topic `tanisoko/sensor/dummy1`
  - Data: suhu, kelembaban, TDS (simulasi)

- [x] Tambah REST endpoint untuk `GET /sensor-log` (dummy atau dari SQLite)

- [ ] (Opsional) Simpan pesan MQTT ke SQLite via subscriber

- [ ] Tes end-to-end:

  - Jalankan backend → publish MQTT
  - Frontend terima data via WebSocket MQTT

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

> **Diperbarui**: **November 2025** > **Oleh**: Slamet — Pemilik & Arsitek TaniSoko
> **Catatan**: Tahap MQTT Tanpa ESP telah ditambahkan di Fase 2 & 4 untuk mempercepat integrasi frontend–backend dengan sistem real-time lokal.

```

```
