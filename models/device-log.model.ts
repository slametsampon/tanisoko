// models/device-log.model.ts

import { z } from 'zod';

export const DeviceLogTypeEnum = z.enum([
  'read',
  'write',
  'alarm',
  'warning',
  'info',
  'error',
]);

export const DeviceLogSchema = z.object({
  id: z.number(),
  device_tag: z.string(), // ✅ foreign key ke `Device.tag_number`
  timestamp: z.string(), // ISO 8601

  type: DeviceLogTypeEnum,
  value: z.union([z.string(), z.number(), z.boolean()]),
  previous_value: z.union([z.string(), z.number(), z.boolean()]).optional(),

  recorded_by: z.string().optional(), // 'system', 'rule_engine', or user id
  note: z.string().optional(),

  // Optional structured meta-data (e.g. alarm severity, thresholds)
  meta: z.record(z.string(), z.unknown()).optional(),
});

export type DeviceLog = z.infer<typeof DeviceLogSchema>;
