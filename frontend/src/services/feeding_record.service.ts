// frontend/src/services/feeding_record.service.ts

import { FeedingRecord } from 'src/models';
import { getRepository } from 'src/repositories/mock/mockRepositoryFactory';
import { BaseRepository } from 'src/repositories/interfaces/BaseRepository';

const repo = getRepository<FeedingRecord>('feeding_record');
export const feeding_recordService: BaseRepository<FeedingRecord> = repo;
