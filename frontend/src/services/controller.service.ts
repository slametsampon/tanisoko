// frontend/src/services/controller.service.ts

import { Controller } from '@/models';
import { getRepository } from 'src/repositories/mock/mockRepositoryFactory';
import { BaseRepository } from 'src/repositories/interfaces/BaseRepository';

const repo = getRepository<Controller>('controller');
export const controllerService: BaseRepository<Controller> = repo;
