// models/device.model.ts

import { z } from 'zod';

// ==== ENUM ====
export const UnitEnum = z.enum([
  '°C',
  '%',
  'cm',
  'RH%',
  'm/s',
  'lux',
  'ppm',
  'kPa',
  'mV',
  'μS/cm',
  'pH',
  'NTU',
]);

export const ConnectivityStatusEnum = z.enum(['online', 'offline', 'error']);
export const ValueStatusEnum = z.enum([
  'normal',
  'low-alarm',
  'high-alarm',
  'sensor-fail',
]);
export const PlatformEnum = z.enum(['esp32', 'esp8266']);
export const DeviceTypeEnum = z.enum(['sensor', 'actuator']);
export const StateTypeEnum = z.enum([
  'on_off',
  'open_close',
  'range',
  'custom',
]);
export const OperationModeEnum = z.enum(['simulation', 'real']);

// ==== DEVICE MODEL ====
export const DeviceSchema = z.object({
  id: z.number(), // Primary key
  tag_number: z.string(), // Unique tag per device
  name: z.string(),
  zone_id: z.number(),
  node_id: z.string(), // ID ESP atau alamat MQTT node

  // Status
  status_connectivity: ConnectivityStatusEnum,
  status_value: ValueStatusEnum.optional(),
  last_seen: z.string().datetime().optional(),

  // Platform Info
  platform: PlatformEnum,
  ip_address: z.string().optional(),
  firmware_version: z.string().optional(),

  // Tipe & Fungsi
  type: DeviceTypeEnum, // 'sensor' | 'actuator'
  function: z.string(),
  operation_mode: OperationModeEnum,

  // Sensor-specific
  unit: z.union([UnitEnum, z.string()]).optional(),
  sample_period_ms: z.number().optional(),
  sample_deadband: z.number().optional(),
  display_precision: z.number().optional(),
  range_min: z.number().optional(),
  range_max: z.number().optional(),
  alarm_min: z.number().optional(),
  alarm_max: z.number().optional(),
  value: z.number().optional(),
  calibration: z.string().optional(),

  // Actuator-specific
  state_type: StateTypeEnum.optional(),
  allowed_states_json: z.string().optional(), // JSON array of allowed states
  default_state: z.union([z.string(), z.number(), z.boolean()]).optional(),
  current_state: z.union([z.string(), z.number(), z.boolean()]).optional(),

  // Scheduled action
  schedule_times_json: z.string().optional(), // JSON array of times (e.g., ["06:00", "18:00"])
  schedule_action: z.union([z.string(), z.number(), z.boolean()]).optional(),

  // Metadata
  description: z.string().optional(),
  location: z.string().optional(),
  metadata_json: z.string().optional(), // Flexible JSON-encoded metadata
});

export type Device = z.infer<typeof DeviceSchema>;
