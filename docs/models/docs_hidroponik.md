# 📘 Dokumentasi Developer: Domain Hidroponik / Hortikultura - Tanisoko

reference : ChatGpt => TaniSoko : Model Data

## 1. 🧭 Overview Domain

Domain hidroponik/hortikultura di Tanisoko mendukung sistem tanam modern berbasis air dan media non-tanah seperti NFT (Nutrient Film Technique), DFT, dan DWC.

Sistem ini mengintegrasikan:

- **Pemantauan lingkungan**: suhu, kelembaban, pH, EC
- **Kendali otomatis**: pompa, valve, aerator, lampu, dll
- **Pencatatan batch tanam & progres** secara digital
- **Alarm & notifikasi otomatis** berbasis aturan (rule engine)

### 👥 Aktor:

- **Petani**: input data, pantau, kontrol perangkat
- **Admin**: setup farm, zona, aturan kontrol
- **Node ESP**: mengirim data sensor & mengeksekusi perintah
- **Frontend**: menampilkan data & kontrol

---

## 2. 🧱 Hirarki Model Data

```plaintext
User
 └── Farm
      ├── Plant
      ├── ProductionUnit (unit_type: 'zone')
      │     └── Device
      │          └── DeviceLog
      └── ProductionCycle
            ├── PlantProgressLog
            └── Relasi ke ProductionUnit (zone_id)
```

| Model              | Deskripsi                                | Relasi Utama                         |
| ------------------ | ---------------------------------------- | ------------------------------------ |
| `User`             | Pengguna aplikasi                        | -                                    |
| `Farm`             | Unit usaha pertanian hidroponik          | FK: `user_id → User.id`              |
| `Plant`            | Master data tanaman (selada, bayam, dll) | FK: `farm_id`                        |
| `ProductionUnit`   | Zona/rak tanam hidroponik                | FK: `farm_id`                        |
| `Device`           | Sensor atau aktuator di zona tertentu    | FK: `zone_id → ProductionUnit`       |
| `DeviceLog`        | Riwayat semua aktivitas/perubahan device | FK: `device_id`                      |
| `ProductionCycle`  | Batch tanam spesifik                     | FK: `farm_id`, `plant_id`, `zone_id` |
| `PlantProgressLog` | Catatan manual pertumbuhan tanaman       | FK: `production_cycle_id`            |

---

## 3. 🧩 Penjelasan Tiap Model

### 🔹 `user`

- Field: `id`, `name`, `email`, `password_hash`, `role`
- Role: `admin`, `petani`, `viewer`

### 🔹 `farm`

- Mewakili lahan atau greenhouse
- Field: `name`, `location`, `type: 'hydroponic'`

### 🔹 `plant`

- Jenis tanaman dan karakteristik lingkungan ideal
- Field penting:
  - `ideal_duration_days`, `temperature_min/max`, `ph_min/max`, `ec_min/max`

### 🔹 `production_unit` (`unit_type: 'zone'`)

- Zona tanam, rak, tray, dsb
- Field: `name`, `capacity`, `length_cm`, `media_type`, `environment`

### 🔹 `production_cycle`

- Satu batch tanam di zona tertentu
- Field: `plant_id`, `zone_id`, `start_date`, `status`, `total_planted`, `domain: 'hydroponik'`

### 🔹 `plant_progress_log`

- Catatan pertumbuhan seperti tinggi, observasi, dll
- Field: `height_cm`, `health_score`, `observation_notes`

### 🔹 `device`

- Sensor atau aktuator ESP32/8266 yang dipasang di zona
- Field:
  - `type`: `'sensor' | 'actuator'`
  - `function`: `temperature`, `ph`, `pump`, dll
  - `control_mode`: `auto` / `manual`
  - `operation_mode`: `real` / `simulation`
  - `current_state` (untuk aktuator), `value` (untuk sensor)

### 🔹 `device_log`

- Mencatat seluruh:
  - Pembacaan sensor (type: `'read'`)
  - Perintah aktuator (type: `'write'`)
  - Alarm, warning, error (type: `'alarm'`, `'warning'`, dsb)
- Field: `timestamp`, `value`, `previous_value`, `meta` (JSON info tambahan)

---

## 4. 🔄 Alur Data & Komunikasi

```plaintext
[ESP32 Node] → MQTT → [Mosquitto Broker @Raspberry Pi] → [Backend] → [Database] → [Web UI]
```

- ESP publish data sensor ke topic MQTT
- Backend:
  - Simpan ke `device_log`
  - Evaluasi rule (mis. jika suhu > 30 → nyalakan kipas)
- HMI frontend menerima update secara real-time melalui WebSocket / polling

---

## 5. 🧪 Contoh Data (Mock JSON)

### 🌱 `production_cycle`

```json
{
  "id": 1,
  "plant_id": 1,
  "zone_id": 1,
  "start_date": "2026-01-01",
  "expected_harvest_date": "2026-02-20",
  "status": "aktif",
  "domain": "hydroponik",
  "total_planted": 100,
  "notes": "Batch selada bulan Februari"
}
```

### 🧪 `device`

```json
{
  "id": 3,
  "zone_id": 1,
  "name": "Sensor Suhu A1",
  "node_id": "esp32_01",
  "status": "online",
  "platform": "esp32",
  "type": "sensor",
  "function": "temperature",
  "pin": "A0",
  "unit": "°C",
  "value": 27.2,
  "state_type": null,
  "current_state": null,
  "calibration": "offset:+0.5",
  "control_mode": "auto",
  "operation_mode": "real"
}
```

---

## 📌 Catatan Khusus

- Gunakan filter `unit_type: 'zone'` untuk menampilkan zona hidroponik
- Semua log perangkat (sensor & aktuator) tercatat dalam `device_log`
- Gunakan `domain: 'hydroponik'` untuk memisahkan data antar domain

---

## 📄 Referensi Terkait

- ERD: [`tanisoko-erd-hidroponik`] (lihat canvas Tanisoko)
- Mock JSON: `mocks/` → `production_units.json`, `devices.json`, `device_logs.json`
- Schema validasi: `models/*.model.ts` (Zod)

---

🧩 Dokumentasi ini dapat digunakan untuk:

- Onboarding developer baru
- Desain antarmuka form
- Validasi API dan integrasi perangkat
- Debugging sistem produksi

Jika domain lain (Perikanan / Peternakan) perlu didokumentasikan dengan format serupa, cukup beri perintah. ✅
