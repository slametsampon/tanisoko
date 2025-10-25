// models/device.model.ts

import { z } from 'zod';

export const DeviceTypeEnum = z.enum(['sensor', 'actuator']);
export const PlatformEnum = z.enum(['esp32', 'esp8266']);
export const ControlModeEnum = z.enum(['manual', 'auto']);
export const OperationModeEnum = z.enum(['simulation', 'real']);
export const ActuatorStateTypeEnum = z.enum([
  'on_off',
  'open_close',
  'range',
  'custom',
]);

export const DeviceSchema = z.object({
  id: z.number(),
  zone_id: z.number(),
  name: z.string(),
  node_id: z.string(),
  status: z.enum(['online', 'offline', 'error']),
  platform: PlatformEnum,
  ip_address: z.string().optional(),
  firmware_version: z.string().optional(),

  // Core classification
  type: DeviceTypeEnum, // sensor or actuator
  function: z.string(), // ex: temperature, pump, ph, tds, heater
  pin: z.string(),

  // Sensor-specific
  unit: z.string().optional(),
  value: z.number().optional(),
  calibration: z.string().optional(),

  // Actuator-specific
  state_type: ActuatorStateTypeEnum.optional(), // Defines how state is represented
  current_state: z.union([z.string(), z.number(), z.boolean()]).optional(),

  // Shared settings
  control_mode: ControlModeEnum, // auto/manual
  operation_mode: OperationModeEnum, // simulation/real
  alarm_threshold_min: z.number().optional(),
  alarm_threshold_max: z.number().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type Device = z.infer<typeof DeviceSchema>;
