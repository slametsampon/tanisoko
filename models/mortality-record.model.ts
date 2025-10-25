// models/mortality-record.model.ts

import { z } from 'zod';
import { UnitTypeEnum } from './production-unit.model';

export const MortalityRecordSchema = z.object({
  id: z.number(),
  cycle_id: z.number(),
  unit_id: z.number(),
  unit_type: UnitTypeEnum,
  timestamp: z.string(),
  death_count: z.number(),
  cause: z.string(),
  note: z.string().optional(),
});

export type MortalityRecord = z.infer<typeof MortalityRecordSchema>;
