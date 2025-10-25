// models/production-cycle.model.ts

import { z } from 'zod';

export const ProductionCycleSchema = z.object({
  id: z.number(),
  farm_id: z.number(),
  start_date: z.string(),
  end_date: z.string(),
  status: z.enum(['aktif', 'selesai', 'panen', 'gagal']),
  notes: z.string().optional(),

  // Domain discriminator
  domain: z.enum(['hydroponic', 'aquaculture', 'poultry']),

  // Discriminated fields
  plant_id: z.number().optional(),
  fish_species_id: z.number().optional(),
  pond_id: z.number().optional(),
  chicken_breed_id: z.number().optional(),
  coop_id: z.number().optional(),
});

export type ProductionCycle = z.infer<typeof ProductionCycleSchema>;
