// frontend/src/config/model-definitions.ts

import { z } from 'zod';
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
import { UserSchema } from '../../../models/user.model';

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
      { key: 'growth_cycle_days', label: 'Lama Tumbuh (Hari)' },
    ],
    displayFields: ['id', 'name', 'type'],
  },
  device_log: {
    schema: DeviceLogSchema,
    fields: [
      { key: 'device_id', label: 'Perangkat' },
      { key: 'timestamp', label: 'Waktu' },
      { key: 'value', label: 'Nilai' },
    ],
    displayFields: ['timestamp', 'value'],
  },
  device: {
    schema: DeviceSchema,
    fields: [
      { key: 'node_id', label: 'Node ID' },
      { key: 'type', label: 'Tipe' },
      { key: 'status', label: 'Status' },
    ],
    displayFields: ['id', 'node_id', 'type'],
  },
  farm: {
    schema: FarmSchema,
    fields: [
      { key: 'name', label: 'Nama Farm' },
      { key: 'location', label: 'Lokasi' },
    ],
    displayFields: ['id', 'name', 'location'],
  },
  feeding_record: {
    schema: FeedingRecordSchema,
    fields: [
      { key: 'production_unit_id', label: 'Unit' },
      { key: 'timestamp', label: 'Waktu' },
      { key: 'amount_gram', label: 'Jumlah (gr)' },
    ],
    displayFields: ['timestamp', 'amount_gram'],
  },
  fish_species: {
    schema: FishSpeciesSchema,
    fields: [
      { key: 'name', label: 'Spesies' },
      { key: 'growth_cycle_days', label: 'Lama Tumbuh' },
    ],
    displayFields: ['id', 'name'],
  },
  mortality_record: {
    schema: MortalityRecordSchema,
    fields: [
      { key: 'timestamp', label: 'Waktu' },
      { key: 'cause', label: 'Penyebab' },
      { key: 'death_count', label: 'Jumlah Mati' },
    ],
    displayFields: ['timestamp', 'death_count', 'cause'],
  },
  plant_progress_log: {
    schema: PlantProgressLogSchema,
    fields: [
      { key: 'timestamp', label: 'Waktu' },
      { key: 'height_cm', label: 'Tinggi (cm)' },
      { key: 'health_score', label: 'Kesehatan' },
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
    displayFields: ['id', 'name', 'variety'],
  },
  production_cycle: {
    schema: ProductionCycleSchema,
    fields: [
      { key: 'farm_id', label: 'Farm' },
      { key: 'start_date', label: 'Mulai' },
      { key: 'status', label: 'Status' },
    ],
    displayFields: ['id', 'start_date', 'status'],
  },
  production_unit: {
    schema: ProductionUnitSchema,
    fields: [
      { key: 'farm_id', label: 'Farm' },
      { key: 'name', label: 'Nama Unit' },
      { key: 'type', label: 'Jenis' },
    ],
    displayFields: ['id', 'name', 'type'],
  },
  rule: {
    schema: RuleSchema,
    fields: [
      { key: 'sensor_id', label: 'Sensor' },
      { key: 'threshold_type', label: 'Tipe Threshold' },
      { key: 'threshold_value', label: 'Nilai Ambang' },
    ],
    displayFields: ['id', 'threshold_type', 'threshold_value'],
  },
  schedule: {
    schema: ScheduleSchema,
    fields: [
      { key: 'cron_expression', label: 'Cron' },
      { key: 'rule_type', label: 'Tipe Aturan' },
    ],
    displayFields: ['id', 'cron_expression'],
  },
  user: {
    schema: UserSchema,
    fields: [
      { key: 'name', label: 'Nama' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Peran' },
    ],
    displayFields: ['id', 'name', 'role'],
  },
};
