// frontend/src/models/production-cycle.model.ts

import { z } from 'zod';
import { DomainEnum, CycleStatusEnum } from 'src/constants/enums';

export const ProductionCycleSchema = z.object({
  id: z.number(),
  farm_id: z.number(),
  start_date: z.string(),
  end_date: z.string(),
  status: CycleStatusEnum,
  domain: DomainEnum,
  notes: z.string().optional(),

  plant_id: z.number().nullable(),
  fish_species_id: z.number().nullable(),
  pond_id: z.number().nullable(),
  chicken_breed_id: z.number().nullable(),
  coop_id: z.number().nullable(),
});

export type ProductionCycle = z.infer<typeof ProductionCycleSchema>;
