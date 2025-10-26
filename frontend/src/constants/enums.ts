// frontend/src/constants/enums.ts

import { z } from 'zod';

export const UnitTypeEnum = z.enum(['zone', 'pond', 'coop']);
export type UnitType = z.infer<typeof UnitTypeEnum>;

export const DomainEnum = z.enum(['hydroponic', 'aquaculture', 'poultry']);
export type Domain = z.infer<typeof DomainEnum>;

export const CycleStatusEnum = z.enum(['aktif', 'selesai', 'panen', 'gagal']);
export type CycleStatus = z.infer<typeof CycleStatusEnum>;
