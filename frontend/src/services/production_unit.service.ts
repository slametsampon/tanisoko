// frontend/src/services/production_unit.service.ts

import { ProductionUnit } from '@/models';
import { getRepository } from 'src/repositories/mock/mockRepositoryFactory';
import { BaseRepository } from 'src/repositories/interfaces/BaseRepository';

const repo = getRepository<ProductionUnit>('production_unit');
export const production_unitService: BaseRepository<ProductionUnit> = repo;
