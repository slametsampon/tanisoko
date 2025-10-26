// frontend/src/config/model-definitions.ts

import { ChickenBreedSchema } from '../../../models/chicken-breed.model';
import { DeviceLogSchema } from '../../../models/device-log.model';
import { DeviceSchema } from '../../../models/device.model';
import { FarmSchema } from '../../../models/farm.model';
import { FeedingRecordSchema } from '../../../models/feeding-record.model';
import { FishSpeciesSchema } from '../../../models/fish-species.model';
import { MortalityRecordSchema } from '../../../models/mortality-record.model';
import { PlantProgressLogSchema } from '../../../models/plant-progress-log.model';
import { PlantSchema } from '../../../models/plant.model';
import { ProductionCycleSchema } from '../../../models/production-cycle.model';
import { ProductionUnitSchema } from '../../../models/production-unit.model';
import { RuleSchema } from '../../../models/rule.model';
import { ScheduleSchema } from '../../../models/schedule.model';

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
  device_log: {
    schema: DeviceLogSchema,
    fields: [
      { key: 'device_id', label: 'Perangkat' },
      { key: 'timestamp', label: 'Waktu' },
      { key: 'type', label: 'Tipe Log' },
      { key: 'value', label: 'Nilai' },
      { key: 'previous_value', label: 'Nilai Sebelumnya' },
      { key: 'recorded_by', label: 'Dicatat Oleh' },
      { key: 'note', label: 'Catatan' },
    ],
    displayFields: ['timestamp', 'device_id', 'value'],
  },
  device: {
    schema: DeviceSchema,
    fields: [
      { key: 'node_id', label: 'Node ID' },
      { key: 'name', label: 'Nama' },
      { key: 'type', label: 'Tipe' },
      { key: 'status', label: 'Status' },
      { key: 'platform', label: 'Platform' },
      { key: 'ip_address', label: 'IP Address' },
      { key: 'firmware_version', label: 'Versi Firmware' },
      { key: 'function', label: 'Fungsi' },
      { key: 'pin', label: 'Pin' },
      { key: 'unit', label: 'Unit' },
      { key: 'value', label: 'Nilai' },
      { key: 'calibration', label: 'Kalibrasi' },
      { key: 'state_type', label: 'Tipe Status' },
      { key: 'current_state', label: 'Status Saat Ini' },
      { key: 'control_mode', label: 'Mode Kontrol' },
      { key: 'operation_mode', label: 'Mode Operasi' },
      { key: 'alarm_threshold_min', label: 'Ambang Bawah' },
      { key: 'alarm_threshold_max', label: 'Ambang Atas' },
    ],
    displayFields: ['id', 'node_id', 'name', 'type'],
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
  mortality_record: {
    schema: MortalityRecordSchema,
    fields: [
      { key: 'timestamp', label: 'Waktu' },
      { key: 'unit_id', label: 'Unit' },
      { key: 'unit_type', label: 'Tipe Unit' },
      { key: 'cycle_id', label: 'Siklus' },
      { key: 'death_count', label: 'Jumlah Mati' },
      { key: 'cause', label: 'Penyebab' },
      { key: 'note', label: 'Catatan' },
    ],
    displayFields: ['timestamp', 'death_count', 'cause'],
  },
  plant_progress_log: {
    schema: PlantProgressLogSchema,
    fields: [
      { key: 'timestamp', label: 'Waktu' },
      { key: 'height_cm', label: 'Tinggi (cm)' },
      { key: 'health_score', label: 'Kesehatan' },
      { key: 'observation_notes', label: 'Catatan' },
    ],
    displayFields: ['timestamp', 'height_cm', 'health_score'],
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
      { key: 'dimensions_cm.length', label: 'Panjang (cm)' },
      { key: 'dimensions_cm.width', label: 'Lebar (cm)' },
      { key: 'dimensions_cm.height', label: 'Tinggi (cm)' },
    ],
    displayFields: ['type', 'name', 'capacity'],
  },
  rule: {
    schema: RuleSchema,
    fields: [
      { key: 'sensor_id', label: 'Sensor' },
      { key: 'actuator_id', label: 'Aktuator' },
      { key: 'threshold_type', label: 'Tipe Threshold' },
      { key: 'threshold_value', label: 'Nilai Ambang' },
      { key: 'action', label: 'Aksi' },
      { key: 'active', label: 'Aktif' },
    ],
    displayFields: ['threshold_type', 'threshold_value'],
  },
  schedule: {
    schema: ScheduleSchema,
    fields: [
      { key: 'device_id', label: 'Perangkat' },
      { key: 'actuator_id', label: 'Aktuator' },
      { key: 'cron_expression', label: 'Cron' },
      { key: 'rule_type', label: 'Tipe Aturan' },
      { key: 'condition_json', label: 'Kondisi' },
      { key: 'is_active', label: 'Aktif' },
    ],
    displayFields: ['cron_expression', 'rule_type'],
  },
};
