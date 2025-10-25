// frontend/src/services/device.service.ts

import { Device } from '@/models';
import { getRepository } from 'src/repositories/mock/mockRepositoryFactory';
import { BaseRepository } from 'src/repositories/interfaces/BaseRepository';

const repo = getRepository<Device>('device');
export const deviceService: BaseRepository<Device> = repo;
