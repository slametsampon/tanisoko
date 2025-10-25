// models/production-unit.model.ts

import { z } from 'zod';

export const UnitTypeEnum = z.enum(['zone', 'pond', 'coop']);
export type UnitType = z.infer<typeof UnitTypeEnum>;

export const ProductionUnitSchema = z.object({
  id: z.number(),
  farm_id: z.number(),
  type: UnitTypeEnum,
  name: z.string(),
  capacity: z.number(),
  dimensions_cm: z.object({
    length: z.number(),
    width: z.number(),
    height: z.number().optional(),
  }),
});

export type ProductionUnit = z.infer<typeof ProductionUnitSchema>;
