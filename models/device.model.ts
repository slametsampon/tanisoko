// models/device.model.ts

import { z } from 'zod';

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

export const DeviceSchema = z.object({
  // Identitas dan zona
  tag_number: z.string(), // PRIMARY KEY
  zone_id: z.number(),
  name: z.string(),
  node_id: z.string(),

  // Status (flattened)
  status_connectivity: z.enum(['online', 'offline', 'error']),
  status_value: z
    .enum(['normal', 'low-alarm', 'high-alarm', 'sensor-fail'])
    .optional(),
  last_seen: z.string().datetime().optional(),

  // Platform dan firmware
  platform: z.enum(['esp32', 'esp8266']),
  ip_address: z.string().optional(),
  firmware_version: z.string().optional(),

  // Klasifikasi dan fungsi
  type: z.enum(['sensor', 'actuator']),
  function: z.string(),

  // Unit pengukuran (standar + fleksibel)
  unit: z.union([UnitEnum, z.string()]).optional(),

  // Sampling dan Display
  sample_period_ms: z.number().optional(),
  sample_deadband: z.number().optional(),
  display_precision: z.number().optional(),

  // Rentang dan alarm
  range_min: z.number().optional(),
  range_max: z.number().optional(),
  alarm_min: z.number().optional(),
  alarm_max: z.number().optional(),

  // Data sensor
  value: z.number().optional(),
  calibration: z.string().optional(),

  // Actuator (flattened)
  state_type: z.enum(['on_off', 'open_close', 'range', 'custom']).optional(),
  allowed_states_json: z.string().optional(), // JSON serialized array
  default_state: z.union([z.string(), z.number(), z.boolean()]).optional(),
  current_state: z.union([z.string(), z.number(), z.boolean()]).optional(),

  // Mode kontrol
  control_mode: z.enum(['manual', 'auto']),
  operation_mode: z.enum(['simulation', 'real']),

  // Informasi tambahan
  description: z.string().optional(),
  location: z.string().optional(),
  metadata_json: z.string().optional(), // JSON serialized
});

export type Device = z.infer<typeof DeviceSchema>;
