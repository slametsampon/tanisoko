# 📘 Dokumentasi Developer: Domain Perikanan - Tanisoko

reference : ChatGpt => TaniSoko : Model Data

## 1. 🧭 Overview Domain

Domain perikanan di Tanisoko mencakup sistem budidaya ikan seperti lele, nila, gurame, dll. Fokusnya adalah **monitoring dan pengelolaan kolam**, pakan, mortalitas, serta automasi perangkat berbasis sensor dan aktuator.

### 👥 Aktor:

- **Petani Ikan**: memantau kondisi kolam dan mencatat kegiatan
- **Admin**: setup unit kolam, spesies, dan aturan
- **ESP Node**: membaca data sensor dan menjalankan perintah

---

## 2. 🧱 Hirarki Model Data

```plaintext
User
 └── Farm
      ├── FishSpecies
      ├── ProductionUnit (unit_type: 'pond')
      │     └── Device
      │          └── DeviceLog
      └── ProductionCycle
            ├── FeedingRecord
            └── MortalityRecord
```

| Model             | Deskripsi                             | Relasi Utama                                |
| ----------------- | ------------------------------------- | ------------------------------------------- |
| `User`            | Pengguna sistem                       | -                                           |
| `Farm`            | Unit usaha budidaya perikanan         | FK: `user_id`                               |
| `FishSpecies`     | Master data spesies ikan              | -                                           |
| `ProductionUnit`  | Kolam budidaya (unit_type: 'pond')    | FK: `farm_id`                               |
| `Device`          | Perangkat sensor atau aktuator        | FK: `zone_id → production_unit.id`          |
| `DeviceLog`       | Riwayat data sensor/perintah aktuator | FK: `device_id`                             |
| `ProductionCycle` | Satu siklus budidaya ikan             | FK: `farm_id`, `fish_species_id`, `pond_id` |
| `FeedingRecord`   | Catatan pemberian pakan               | FK: `cycle_id`, `unit_id`                   |
| `MortalityRecord` | Catatan kematian ikan                 | FK: `cycle_id`, `unit_id`                   |

---

## 3. 🧩 Penjelasan Tiap Model

### 🔹 `fish_species`

- Field: `name`, `scientific_name`, `description`, `ideal_temperature_min/max`, `feeding_frequency`, `ideal_harvest_day`

### 🔹 `production_unit` (`unit_type: 'pond'`)

- Representasi kolam fisik
- Field: `capacity`, `length_cm`, `shape`, `environment` (indoor/outdoor)

### 🔹 `production_cycle`

- Satu periode budidaya ikan
- Field:
  - `fish_species_id`
  - `zone_id` → kolam tempat budidaya
  - `total_stocked`, `start_date`, `expected_harvest_date`, `status`, `domain: 'perikanan'`

### 🔹 `feeding_record`

- Catatan pemberian pakan per kolam/siklus
- Field: `timestamp`, `amount_gram`, `feed_type`, `note`

### 🔹 `mortality_record`

- Catatan kematian ikan per kolam/siklus
- Field: `timestamp`, `count`, `reason`

### 🔹 `device`

- Sensor dan aktuator di kolam (aerator, DO sensor, suhu, dll)
- Field:
  - `type`, `function`, `value`, `current_state`, `operation_mode`, `control_mode`

### 🔹 `device_log`

- Riwayat pembacaan sensor / aksi aktuator / alarm
- Field: `type: 'read' | 'write' | 'alarm'`, `value`, `meta`

---

## 4. 🔄 Alur Data

```plaintext
[ESP32 Device] → MQTT Broker → Backend
                                ↳ Simpan ke DB
                                ↳ Evaluasi Rule → Trigger
                                ↳ Web UI Update → Petani
```

- **Sensor air** kirim data ke MQTT topic: `farm/3/device/12/data`
- **Backend** menyimpan ke `device_log`, evaluasi rule
- Jika DO rendah → aktifkan aerator (via `device.control_mode = auto`)

---

## 5. 🧪 Contoh Data

### 🐟 `production_cycle`

```json
{
  "id": 1,
  "fish_species_id": 2,
  "pond_id": 3,
  "start_date": "2026-01-10",
  "expected_harvest_date": "2026-04-20",
  "status": "aktif",
  "domain": "perikanan",
  "total_stocked": 1500,
  "notes": "Budidaya lele kolam A"
}
```

### 🐠 `feeding_record`

```json
{
  "id": 5,
  "cycle_id": 1,
  "unit_id": 3,
  "timestamp": "2026-02-01T07:30:00Z",
  "amount_gram": 500,
  "feed_type": "pelet A",
  "note": "Pagi hari"
}
```

---

## 📌 Catatan Penting

- Gunakan `unit_type = 'pond'` untuk menyaring kolam
- `feeding_record` dan `mortality_record` dapat digunakan lintas domain
- Semua perangkat dicatat melalui `device` & `device_log`
- Gunakan field `domain = 'perikanan'` pada `production_cycle` untuk filter

---

## 📄 Referensi Terkait

- ERD: [`tanisoko-erd-perikanan`] (lihat canvas Tanisoko)
- Mock JSON: `mocks/production_cycles.json`, `feeding_records.json`
- Schema: `models/*.model.ts`

---

📘 Dokumentasi ini disusun untuk mendukung:

- Developer frontend/backend
- Integrator sistem ESP + MQTT
- Desainer UI HMI

Lanjut ke domain Peternakan Ayam jika dibutuhkan. ✅
