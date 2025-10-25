// frontend/src/services/schedule.service.ts

import { Schedule } from '@/models';
import { getRepository } from 'src/repositories/mock/mockRepositoryFactory';
import { BaseRepository } from 'src/repositories/interfaces/BaseRepository';

const repo = getRepository<Schedule>('schedule');
export const scheduleService: BaseRepository<Schedule> = repo;
