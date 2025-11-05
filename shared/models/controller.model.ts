// models/controller.model.ts

import { z } from 'zod';

export const ControllerTypeEnum = z.enum([
  'threshold',
  'pid',
  'hysteresis',
  'custom',
]);
export const ThresholdTypeEnum = z.enum(['greater_than', 'less_than', 'equal']);
export const ControlModeEnum = z.enum(['manual', 'auto']);

export const ControllerSchema = z.object({
  id: z.number(), // PK
  name: z.string(),

  actuator_device_id: z.number(), // FK → device.type === 'actuator'
  sensor_device_id: z.number(), // FK → device.type === 'sensor'

  controller_type: ControllerTypeEnum, // Logic used: threshold, pid, etc.
  control_mode: ControlModeEnum, // manual | auto

  setpoint: z.number(), // Target nilai (acuan)

  threshold_type: ThresholdTypeEnum.optional(), // Untuk threshold controller
  threshold_value: z.number().optional(), // Jarak toleransi, bisa jadi deadband

  output_command: z.union([z.string(), z.number(), z.boolean()]).optional(),

  params_json: z.string().optional(), // JSON serialized, e.g. PID params
  is_active: z.boolean().default(true),
});

export type Controller = z.infer<typeof ControllerSchema>;
