// frontend/src/services/device_log.service.ts

import { DeviceLog } from 'src/models';
import { getRepository } from 'src/repositories/mock/mockRepositoryFactory';
import { BaseRepository } from 'src/repositories/interfaces/BaseRepository';

const repo = getRepository<DeviceLog>('device_log');
export const device_logService: BaseRepository<DeviceLog> = repo;
