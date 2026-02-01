// frontend/src/models/fish-species.model.ts

import { z } from 'zod';

export const FishSpeciesSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  growth_cycle_days: z.number(),
  average_weight_gram: z.number(),
  feed_type: z.string(),
  ideal_temp_min: z.number(),
  ideal_temp_max: z.number(),
  ideal_ph_min: z.number(),
  ideal_ph_max: z.number(),
  ideal_do_min: z.number(),
  ideal_tds_max: z.number(),
});
export type FishSpecies = z.infer<typeof FishSpeciesSchema>;
