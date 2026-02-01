# 📘 Tanisoko Developer Manual

reference : ChatGpt => TaniSoko : Model Data

Dokumentasi ini menyatukan seluruh domain utama sistem Tanisoko: **Hidroponik / Hortikultura**, **Perikanan**, dan **Peternakan Ayam Pedaging**. Fokus pada arsitektur data, integrasi IoT, dan panduan teknis untuk pengembang.

---

## 🧭 1. Tujuan Sistem

Tanisoko adalah platform IoT terintegrasi untuk pertanian modern:

- Monitoring berbasis sensor
- Automasi perangkat melalui rule
- Antarmuka Web (HMI) untuk kontrol dan visualisasi
- Skema data modular berbasis domain

---

## 🗂️ 2. Struktur Umum Model

Semua domain berbagi model dasar berikut:

| Model             | Deskripsi                                      |
| ----------------- | ---------------------------------------------- |
| `User`            | Akun pengguna dan role                         |
| `Farm`            | Lokasi fisik tempat produksi                   |
| `ProductionUnit`  | Unit produksi: `zone`, `pond`, `coop`          |
| `ProductionCycle` | Satu batch produksi (tanam / budidaya / flock) |
| `Device`          | Sensor atau aktuator berbasis ESP              |
| `DeviceLog`       | Catatan semua interaksi perangkat              |

Model tambahan disesuaikan berdasarkan domain masing-masing.

---

## 🌿 3. Domain: Hidroponik / Hortikultura

- `unit_type`: `'zone'`
- `plant`: data tanaman dan lingkungan ideal
- `plant_progress_log`: catatan pertumbuhan manual

### Hirarki:

```plaintext
User → Farm → ProductionUnit (zone)
                     ↳ Device → DeviceLog
                     ↳ ProductionCycle → PlantProgressLog
```

### Contoh Spesifik:

- NFT tray selada dengan sensor EC & aktuator pompa
- Monitoring otomatis melalui rule `ec < 1.5 → nyalakan pompa nutrisi`

---

## 🐟 4. Domain: Perikanan

- `unit_type`: `'pond'`
- `fish_species`: spesies budidaya
- `feeding_record`, `mortality_record`: log pakan dan kematian

### Hirarki:

```plaintext
User → Farm → ProductionUnit (pond)
                     ↳ Device → DeviceLog
                     ↳ ProductionCycle → FeedingRecord
                                      → MortalityRecord
```

### Contoh:

- Kolam Lele 2x3m dengan sensor suhu & aerator
- Rule: `temperature < 25 → aktifkan heater`

---

## 🐔 5. Domain: Peternakan Ayam Pedaging

- `unit_type`: `'coop'`
- `chicken_breed`: jenis ayam broiler
- Menggunakan kembali feeding/mortality log dari perikanan

### Hirarki:

```plaintext
User → Farm → ProductionUnit (coop)
                     ↳ Device → DeviceLog
                     ↳ ProductionCycle → FeedingRecord
                                      → MortalityRecord
```

### Contoh:

- Kandang broiler 2000 ekor dengan sensor amonia & kipas
- Rule: `amonia > threshold → aktifkan exhaust fan`

---

## 🔧 6. Struktur Device & Log

### `Device`

- Generalized: satu model untuk semua sensor & aktuator
- Field:
  - `type`: `'sensor' | 'actuator'`
  - `function`: `ph`, `temperature`, `aerator`, dll
  - `control_mode`: `'auto' | 'manual'`
  - `operation_mode`: `'real' | 'simulation'`
  - `value`, `current_state`, `status`

### `DeviceLog`

- Field:
  - `device_id`, `timestamp`, `type`, `value`, `previous_value`, `meta`
  - `type`: `'read' | 'write' | 'alarm' | 'warning'`

---

## 🔄 7. Alur Data IoT

```plaintext
[ESP32 Node] → MQTT (Mosquitto @Raspberry Pi)
              → Backend (Subscribe, Save, Evaluate Rule)
              → Web UI / API (Publish, Display, Control)
```

- Semua sensor publish ke topic: `farm/{farmId}/device/{deviceId}/data`
- Aktuator dikontrol via publish: `farm/{farmId}/device/{deviceId}/cmd`

---

## 📁 8. Struktur File & Model (Frontend `src/`)

| Folder          | Isi                                                                 |
| --------------- | ------------------------------------------------------------------- |
| `assets/mocks/` | Data contoh JSON (mock) dari semua model                            |
| `config/`       | Konfigurasi global frontend                                         |
| `constants/`    | Konstanta sistem (role, enum, dll)                                  |
| `context/`      | Context API untuk state management (user, theme, dsb)               |
| `event-log/`    | Modul pencatatan event device                                       |
| `models/`       | Definisi semua model Zod TypeScript: device, user, unit, cycle, dll |
| `components/`   | Komponen LitElement (HMI frontend)                                  |

---

## 📎 9. Tips Dev & Validasi

- Gunakan `unit_type` & `domain` untuk filtering lintas domain
- Hindari redundansi log: cukup `device_log` untuk semua
- Gunakan `Zod` untuk validasi schema TypeScript
- MQTT test: gunakan `mosquitto_pub` dan `mosquitto_sub`
- UI dibangun dengan `LitElement + Tailwind`

---

## 📌 Referensi Lanjutan

- ERD per domain: `tanisoko-erd-hidroponik`, `...perikanan`, `...peternakan`
- Mock JSON tersedia dalam `assets/mocks/`
- Frontend terhubung via MQTT WebSocket dan REST API

---

🧩 Dokumentasi ini diperbarui secara berkala dan dapat diekspor ke Notion, PDF, atau Wiki internal tim.
