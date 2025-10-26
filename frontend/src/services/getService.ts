// frontend/src/services/getService.ts

import { BaseRepository } from 'src/repositories/interfaces/BaseRepository';
import { serviceMap } from './service-map';

// ✅ Tetap gunakan ini untuk ambil service berdasarkan key
export function getService<T>(model: string): BaseRepository<T> {
  console.log(`[getService] Requested model: "${model}"`);
  const service = serviceMap[model];

  if (!service) {
    console.error(`[getService] ❌ Service not found for model: "${model}"`);
    console.error('[getService] Available models:', Object.keys(serviceMap));
    throw new Error(`Service not found for model "${model}"`);
  }

  console.log(`[getService] ✅ Service found for model: "${model}"`);
  return service as BaseRepository<T>;
}
