// frontend/src/services/plant_progress_log.service.ts

import { PlantProgressLog } from '@/models';
import { getRepository } from 'src/repositories/mock/mockRepositoryFactory';
import { BaseRepository } from 'src/repositories/interfaces/BaseRepository';

const repo = getRepository<PlantProgressLog>('plant_progress_log');
export const plant_progress_logService: BaseRepository<PlantProgressLog> = repo;
