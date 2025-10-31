// frontend/src/services/chicken_breed.service.ts

import { ChickenBreed } from 'src/models';
import { getRepository } from 'src/repositories/mock/mockRepositoryFactory';
import { BaseRepository } from 'src/repositories/interfaces/BaseRepository';

const repo = getRepository<ChickenBreed>('chicken_breed');

export const chicken_breedService: BaseRepository<ChickenBreed> = repo;
