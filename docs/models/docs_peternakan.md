# 📘 Dokumentasi Developer: Domain Peternakan Ayam Pedaging - Tanisoko

reference : ChatGpt => TaniSoko : Model Data

## 1. 🧭 Overview Domain

Domain ini mendukung pengelolaan kandang ayam pedaging secara digital, termasuk:

- Pencatatan siklus budidaya (flock)
- Monitoring sensor lingkungan (suhu, amonia, kelembaban)
- Pencatatan pakan & kematian
- Otomatisasi kipas, lampu, feeder, dan alarm

### 👥 Aktor:

- **Operator kandang**: input data, pantau kondisi
- **Admin peternakan**: konfigurasi awal, manajemen device
- **Node IoT ESP**: kontrol sensor/aktuator

---

## 2. 🧱 Hirarki Model Data

```plaintext
User
 └── Farm
      ├── ChickenBreed
      ├── ProductionUnit (unit_type: 'coop')
      │     └── Device
      │          └── DeviceLog
      └── ProductionCycle
            ├── FeedingRecord
            └── MortalityRecord
```

| Model             | Deskripsi                            | Relasi Utama                      |
| ----------------- | ------------------------------------ | --------------------------------- |
| `User`            | Pengguna sistem                      | -                                 |
| `Farm`            | Unit peternakan ayam                 | FK: `user_id`                     |
| `ChickenBreed`    | Jenis ayam pedaging                  | -                                 |
| `ProductionUnit`  | Kandang ayam (unit_type: 'coop')     | FK: `farm_id`                     |
| `Device`          | Perangkat sensor/aktuator kandang    | FK: `zone_id`                     |
| `DeviceLog`       | Riwayat aktivitas device             | FK: `device_id`                   |
| `ProductionCycle` | Satu batch pemeliharaan ayam (flock) | FK: `chicken_breed_id`, `coop_id` |
| `FeedingRecord`   | Catatan pemberian pakan              | FK: `cycle_id`, `unit_id`         |
| `MortalityRecord` | Catatan kematian ayam                | FK: `cycle_id`, `unit_id`         |

---

## 3. 🧩 Penjelasan Tiap Model

### 🔹 `chicken_breed`

- Info dasar ayam: `name`, `description`, `growth_duration_days`, `feed_type`, `temperature_min/max`

### 🔹 `production_unit` (`unit_type: 'coop'`)

- Representasi kandang fisik
- Field: `capacity`, `length_cm`, `media_type`, `environment`, dll

### 🔹 `production_cycle`

- Batch ayam masuk kandang
- Field:
  - `chicken_breed_id`, `coop_id`, `start_date`, `expected_harvest_date`, `total_stocked`, `status`, `domain: 'peternakan'`

### 🔹 `feeding_record`

- Catatan jumlah pakan harian
- Field: `timestamp`, `amount_gram`, `feed_type`, `note`

### 🔹 `mortality_record`

- Catatan jumlah ayam mati
- Field: `timestamp`, `count`, `reason`

### 🔹 `device`

- Bisa berupa:
  - Sensor: suhu, amonia, kelembaban
  - Aktuator: kipas, feeder, lampu
- Field:
  - `type`, `function`, `value`, `current_state`, `operation_mode`, `control_mode`, `simulation`

### 🔹 `device_log`

- Catatan perubahan data dan kontrol
- Mendukung: `read`, `write`, `alarm`, `warning`

---

## 4. 🔄 Alur Data & Automasi

```plaintext
[ESP32 Node @kandang] → MQTT Broker → Backend
                                  ↳ Simpan device_log
                                  ↳ Evaluasi rule (contoh: suhu > 32°C → nyalakan kipas)
                                  ↳ Update HMI frontend
```

- Operator input `feeding_record`, `mortality_record`
- Rule bisa bersifat manual/otomatis via `control_mode`

---

## 5. 🐔 Contoh Data JSON

### `production_cycle`

```json
{
  "id": 12,
  "coop_id": 3,
  "chicken_breed_id": 2,
  "start_date": "2026-01-15",
  "expected_harvest_date": "2026-02-28",
  "status": "aktif",
  "total_stocked": 2000,
  "domain": "peternakan",
  "notes": "Flock 01 kandang A"
}
```

### `feeding_record`

```json
{
  "cycle_id": 12,
  "unit_type": "coop",
  "unit_id": 3,
  "timestamp": "2026-02-01T06:00:00Z",
  "amount_gram": 12000,
  "feed_type": "BR1",
  "note": "Pakan pagi"
}
```

---

## 📌 Catatan

- `production_unit` digunakan juga oleh perikanan dan hidroponik
- Gunakan `unit_type = 'coop'` dan `domain = 'peternakan'` sebagai penyaring
- Semua perangkat (sensor/aktuator) dikelola melalui `device` → `device_log`
- Tidak perlu model khusus untuk kipas, feeder, dsb

---

## 📄 Referensi

- ERD: [`tanisoko-erd-peternakan`]
- Mock JSON: `mocks/coop_devices.json`, `feeding_records.json`
- Validasi schema: `zod` model pada `models/*.model.ts`

---

📘 Dokumentasi ini cocok untuk:

- Developer frontend & backend
- Tim IoT device firmware
- QA tester dan teknisi lapangan

Ingin saya bantu gabungkan semua dokumen ini menjadi manual lengkap? ✅
