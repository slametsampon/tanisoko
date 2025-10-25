// frontend/src/services/rule.service.ts

import { Rule } from '@/models';
import { getRepository } from 'src/repositories/mock/mockRepositoryFactory';
import { BaseRepository } from 'src/repositories/interfaces/BaseRepository';

const repo = getRepository<Rule>('rule');
export const ruleService: BaseRepository<Rule> = repo;
