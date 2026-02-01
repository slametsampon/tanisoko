// models/chicken-breed.model.ts

import { z } from 'zod';

export const ChickenBreedSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.enum(['broiler', 'layer']),
  description: z.string(),
  growth_cycle_days: z.number(),
  average_weight_gram: z.number(),
  ideal_temp_min: z.number(),
  ideal_temp_max: z.number(),
  ideal_humidity_min: z.number(),
  ideal_humidity_max: z.number(),
  notes: z.string(),
});

export type ChickenBreed = z.infer<typeof ChickenBreedSchema>;
