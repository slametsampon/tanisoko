// frontend/src/services/farm.service.ts

import { Farm } from 'src/models';
import { getRepository } from 'src/repositories/mock/mockRepositoryFactory';
import { BaseRepository } from 'src/repositories/interfaces/BaseRepository';

const repo = getRepository<Farm>('farm');
export const farmService: BaseRepository<Farm> = repo;
