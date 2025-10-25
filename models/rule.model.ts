// models/rule.model.ts

import { z } from 'zod';

export const RuleSchema = z.object({
  id: z.number(),
  device_id: z.number(),
  sensor_id: z.number(),
  actuator_id: z.number(),
  threshold_type: z.string(),
  threshold_value: z.number(),
  action: z.string(),
  active: z.boolean(),
});

export type Rule = z.infer<typeof RuleSchema>;
