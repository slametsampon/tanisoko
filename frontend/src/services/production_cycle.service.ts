// frontend/src/services/production_cycle.service.ts

import { ProductionCycle } from 'src/models';
import { getRepository } from 'src/repositories/mock/mockRepositoryFactory';
import { BaseRepository } from 'src/repositories/interfaces/BaseRepository';

const repo = getRepository<ProductionCycle>('production_cycle');
export const production_cycleService: BaseRepository<ProductionCycle> = repo;
