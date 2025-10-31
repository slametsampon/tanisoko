// frontend/src/services/plant.service.ts

import { Plant } from 'src/models';
import { getRepository } from '../repositories/mock/mockRepositoryFactory';
import { BaseRepository } from '../repositories/interfaces/BaseRepository';

const repo = getRepository<Plant>('plant');

export const plantService: BaseRepository<Plant> = repo;
