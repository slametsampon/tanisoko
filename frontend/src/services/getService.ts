// frontend/src/services/getService.ts

import { BaseRepository } from 'src/repositories/interfaces/BaseRepository';

import { plantService } from './plant.service';
import { fish_speciesService } from './fish_species.service';
import { chicken_breedService } from './chicken_breed.service';
import { production_unitService } from './production_unit.service';
import { production_cycleService } from './production_cycle.service';
import { feeding_recordService } from './feeding_record.service';
import { mortality_recordService } from './mortality_record.service';
import { plant_progress_logService } from './plant_progress_log.service';
import { deviceService } from './device.service';
import { device_logService } from './device_log.service';
import { ruleService } from './rule.service';
import { scheduleService } from './schedule.service';
import { farmService } from './farm.service';

const serviceMap: Record<string, BaseRepository<any>> = {
  plant: plantService,
  fish_species: fish_speciesService,
  chicken_breed: chicken_breedService,
  production_unit: production_unitService,
  production_cycle: production_cycleService,
  feeding_record: feeding_recordService,
  mortality_record: mortality_recordService,
  plant_progress_log: plant_progress_logService,
  device: deviceService,
  device_log: device_logService,
  rule: ruleService,
  schedule: scheduleService,
  farm: farmService,
};

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
