// models/plant-progress-log.model.ts

import { z } from 'zod';

export const PlantProgressLogSchema = z.object({
  id: z.number(),
  batch_id: z.number(),
  timestamp: z.string(),
  height_cm: z.number(),
  health_score: z.string(),
  observation_notes: z.string(),
});

export type PlantProgressLog = z.infer<typeof PlantProgressLogSchema>;
