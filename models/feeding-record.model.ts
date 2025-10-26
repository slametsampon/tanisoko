// models/feeding-record.model.ts

import { z } from 'zod';
import { UnitTypeEnum } from '../frontend/src/constants/enums';

export const FeedingRecordSchema = z.object({
  id: z.number(),
  cycle_id: z.number(),
  unit_id: z.number(),
  unit_type: UnitTypeEnum,
  timestamp: z.string(),
  feed_type: z.string(),
  method: z.string(),
  amount_gram: z.number(),
  recorded_by: z.string(),
  note: z.string().optional(),
});

export type FeedingRecord = z.infer<typeof FeedingRecordSchema>;
