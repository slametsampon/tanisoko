// frontend/src/services/mortality_record.service.ts

import { MortalityRecord } from '@/models';
import { getRepository } from 'src/repositories/mock/mockRepositoryFactory';
import { BaseRepository } from 'src/repositories/interfaces/BaseRepository';

const repo = getRepository<MortalityRecord>('mortality_record');
export const mortality_recordService: BaseRepository<MortalityRecord> = repo;
