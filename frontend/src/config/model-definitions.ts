// frontend/src/config/model-definitions.ts

import { ChickenBreedSchema } from 'src/models/chicken-breed.model';
import { DeviceSchema } from 'src/models/device.model';
import { FarmSchema } from 'src/models/farm.model';
import { FeedingRecordSchema } from 'src/models/feeding-record.model';
import { FishSpeciesSchema } from 'src/models/fish-species.model';
import { PlantSchema } from 'src/models/plant.model';
import { ProductionCycleSchema } from 'src/models/production-cycle.model';
import { ProductionUnitSchema } from 'src/models/production-unit.model';
import { ControllerSchema } from 'src/models/controller.model';

type FieldDef = {
  key: string;
  label: string;
  type?: string;
};

export const modelDefinitions = {
  chicken_breed: {
    schema: ChickenBreedSchema,
    fields: [
      { key: 'name', label: 'Nama Ras' },
      { key: 'type', label: 'Tipe' },
      { key: 'description', label: 'Deskripsi' },
      { key: 'growth_cycle_days', label: 'Lama Tumbuh (Hari)' },
      { key: 'average_weight_gram', label: 'Berat Rata-rata (gr)' },
      { key: 'ideal_temp_min', label: 'Suhu Ideal Min (°C)' },
      { key: 'ideal_temp_max', label: 'Suhu Ideal Max (°C)' },
      { key: 'ideal_humidity_min', label: 'Kelembaban Ideal Min (%)' },
      { key: 'ideal_humidity_max', label: 'Kelembaban Ideal Max (%)' },
      { key: 'notes', label: 'Catatan' },
    ],
    displayFields: ['id', 'name', 'type'],
  },
  device: {
    schema: DeviceSchema,
    fields: [
      { key: 'tag_number', label: 'Tag Number' },
      { key: 'node_id', label: 'Node ID' },
      { key: 'description', label: 'Deskripsi' },
      { key: 'type', label: 'Tipe' },
      { key: 'status_connectivity', label: 'Status Koneksi' },
      { key: 'platform', label: 'Platform' },
      { key: 'ip_address', label: 'IP Address' },
      { key: 'firmware_version', label: 'Versi Firmware' },
      { key: 'function', label: 'Fungsi' },
      { key: 'unit', label: 'Unit' },
      { key: 'value', label: 'Nilai' },
      { key: 'calibration', label: 'Kalibrasi' },
      { key: 'state_type', label: 'Tipe Status' },
      { key: 'current_state', label: 'Status Saat Ini' },
      { key: 'operation_mode', label: 'Mode Operasi' },
      { key: 'alarm_min', label: 'Ambang Bawah' },
      { key: 'alarm_max', label: 'Ambang Atas' },
    ],
    displayFields: ['tag_number', 'node_id', 'description', 'type'],
  },
  farm: {
    schema: FarmSchema,
    fields: [
      { key: 'name', label: 'Nama Farm' },
      { key: 'location', label: 'Lokasi' },
      { key: 'type', label: 'Tipe' },
    ],
    displayFields: ['type', 'name', 'location'],
  },
  feeding_record: {
    schema: FeedingRecordSchema,
    fields: [
      { key: 'cycle_id', label: 'Siklus Produksi' },
      { key: 'unit_id', label: 'Unit' },
      { key: 'unit_type', label: 'Tipe Unit' },
      { key: 'timestamp', label: 'Waktu' },
      { key: 'feed_type', label: 'Jenis Pakan' },
      { key: 'method', label: 'Metode' },
      { key: 'amount_gram', label: 'Jumlah (gr)' },
      { key: 'recorded_by', label: 'Dicatat Oleh' },
      { key: 'note', label: 'Catatan' },
    ],
    displayFields: ['timestamp', 'amount_gram', 'feed_type'],
  },
  fish_species: {
    schema: FishSpeciesSchema,
    fields: [
      { key: 'name', label: 'Spesies' },
      { key: 'description', label: 'Deskripsi' },
      { key: 'growth_cycle_days', label: 'Lama Tumbuh (Hari)' },
      { key: 'average_weight_gram', label: 'Berat Rata-rata (gr)' },
      { key: 'feed_type', label: 'Jenis Pakan' },
      { key: 'ideal_temp_min', label: 'Suhu Ideal Min (°C)' },
      { key: 'ideal_temp_max', label: 'Suhu Ideal Max (°C)' },
      { key: 'ideal_ph_min', label: 'pH Ideal Min' },
      { key: 'ideal_ph_max', label: 'pH Ideal Max' },
      { key: 'ideal_do_min', label: 'DO Ideal Min' },
      { key: 'ideal_tds_max', label: 'TDS Ideal Max' },
    ],
    displayFields: [
      'name',
      'feed_type',
      'growth_cycle_days',
      'average_weight_gram',
    ],
  },
  plant: {
    schema: PlantSchema,
    fields: [
      { key: 'name', label: 'Tanaman' },
      { key: 'variety', label: 'Varietas' },
      { key: 'description', label: 'Deskripsi' },
      { key: 'ideal_duration_days', label: 'Durasi Ideal (hari)' },
      { key: 'average_yield_gram', label: 'Hasil Rata-rata (gram)' },
      { key: 'nutrient_requirement', label: 'Nutrisi' },
      { key: 'temperature_min', label: 'Suhu Min (°C)' },
      { key: 'temperature_max', label: 'Suhu Max (°C)' },
      { key: 'humidity_min', label: 'Kelembaban Min (%)' },
      { key: 'humidity_max', label: 'Kelembaban Max (%)' },
      { key: 'ph_min', label: 'pH Min' },
      { key: 'ph_max', label: 'pH Max' },
      { key: 'ec_min', label: 'EC Min' },
      { key: 'ec_max', label: 'EC Max' },
    ],
    displayFields: [
      'name',
      'variety',
      'ideal_duration_days',
      'average_yield_gram',
    ],
  },
  production_cycle: {
    schema: ProductionCycleSchema,
    fields: [
      { key: 'farm_id', label: 'Farm' },
      { key: 'start_date', label: 'Mulai' },
      { key: 'end_date', label: 'Selesai' },
      { key: 'status', label: 'Status' },
      { key: 'domain', label: 'Domain' },
      { key: 'plant_id', label: 'Tanaman' },
      { key: 'fish_species_id', label: 'Spesies Ikan' },
      { key: 'pond_id', label: 'Kolam' },
      { key: 'chicken_breed_id', label: 'Ras Ayam' },
      { key: 'coop_id', label: 'Kandang' },
      { key: 'notes', label: 'Catatan' },
    ],
    displayFields: ['domain', 'start_date', 'status'],
  },
  production_unit: {
    schema: ProductionUnitSchema,
    fields: [
      { key: 'farm_id', label: 'Farm' },
      { key: 'name', label: 'Nama Unit' },
      { key: 'type', label: 'Jenis' },
      { key: 'capacity', label: 'Kapasitas' },
      { key: 'dimensions_length', label: 'Panjang (cm)' },
      { key: 'dimensions_width', label: 'Lebar (cm)' },
      { key: 'dimensions_height', label: 'Tinggi (cm)' },
    ],
    displayFields: ['type', 'name', 'capacity'],
  },
  controller: {
    schema: ControllerSchema,
    fields: [
      { key: 'name', label: 'Nama Controller' },
      { key: 'sensor_device_id', label: 'Sensor' },
      { key: 'actuator_device_id', label: 'Aktuator' },
      { key: 'controller_type', label: 'Tipe Controller' },
      { key: 'control_mode', label: 'Mode Kontrol' },
      { key: 'setpoint', label: 'Setpoint' },
      { key: 'threshold_type', label: 'Tipe Threshold' },
      { key: 'threshold_value', label: 'Nilai Ambang' },
      { key: 'output_command', label: 'Aksi/Perintah' },
      { key: 'params_json', label: 'Parameter Tambahan' },
      { key: 'is_active', label: 'Aktif' },
    ],
    displayFields: ['name', 'controller_type', 'setpoint'],
  },
};
