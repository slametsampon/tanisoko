// frontend/src/repositories/mock/mockRepositoryFactory.ts

import { createMockRepository } from './createMockRepository';
import { BaseRepository } from '../interfaces/BaseRepository';

// 🔁 Mapping otomatis semua model (bisa dari enum atau daftar statis jika ingin lebih ketat)
const availableModels = [
  'plant',
  'fish_species',
  'chicken_breed',
  'production_unit',
  'production_cycle',
  'feeding_record',
  'mortality_record',
  'plant_progress_log',
  'device',
  'device_log',
  'rule',
  'schedule',
  'farm',
];

const cache: Record<string, BaseRepository<any>> = {};

export function getRepository<T>(model: string): BaseRepository<T> {
  const prefix = `[getRepository]`;

  if (!availableModels.includes(model)) {
    console.error(`${prefix} ❌ Model "${model}" not in available list.`);
    console.warn(`${prefix} Available models:`, availableModels);
    throw new Error(`Repository for model "${model}" not available.`);
  }

  if (!cache[model]) {
    console.log(`${prefix} Creating repository for model "${model}"`);
    cache[model] = createMockRepository<T>(model);
  } else {
    console.log(`${prefix} Using cached repository for "${model}"`);
  }

  return cache[model] as BaseRepository<T>;
}
