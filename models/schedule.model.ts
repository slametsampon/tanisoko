// models/schedule.model.ts

import { z } from 'zod';

export const ScheduleSchema = z.object({
  id: z.number(),
  device_id: z.number(),
  actuator_id: z.number(),
  cron_expression: z.string(),
  rule_type: z.string(),
  condition_json: z.string(),
  is_active: z.boolean(),
});

export type Schedule = z.infer<typeof ScheduleSchema>;
