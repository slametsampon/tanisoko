// models/plant.model.ts

import { z } from 'zod';

export const PlantSchema = z.object({
  id: z.number(),
  name: z.string(),
  variety: z.string(),
  description: z.string(),
  ideal_duration_days: z.number(),
  average_yield_gram: z.number(),
  nutrient_requirement: z.string(),
  temperature_min: z.number(),
  temperature_max: z.number(),
  humidity_min: z.number(),
  humidity_max: z.number(),
  ph_min: z.number(),
  ph_max: z.number(),
  ec_min: z.number(),
  ec_max: z.number(),
});

export type Plant = z.infer<typeof PlantSchema>;
