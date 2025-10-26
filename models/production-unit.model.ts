// models/production-unit.model.ts

import { z } from 'zod';
import { UnitTypeEnum } from '../frontend/src/constants/enums';

export const ProductionUnitSchema = z.object({
  id: z.number(),
  farm_id: z.number(),
  type: UnitTypeEnum,
  name: z.string().min(1),
  capacity: z.number().positive(),
  dimensions_length: z.number().positive(),
  dimensions_width: z.number().positive(),
  dimensions_height: z.number().positive().optional(),
});

export type ProductionUnit = z.infer<typeof ProductionUnitSchema>;
