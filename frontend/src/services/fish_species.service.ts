// frontend/src/services/fish_species.service.ts

import { FishSpecies } from 'src/models';
import { getRepository } from '../repositories/mock/mockRepositoryFactory';
import { BaseRepository } from '../repositories/interfaces/BaseRepository';

const repo = getRepository<FishSpecies>('fish_species');

export const fish_speciesService: BaseRepository<FishSpecies> = repo;
