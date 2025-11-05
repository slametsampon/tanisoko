// models/event-log.model.ts

import { z } from 'zod';

// Entitas sumber dari event (bukan model log)
export const EventSourceEnum = z.enum([
  'controller',
  'device',
  'farm',
  'plant',
  'production_cycle',
  'production_unit',
  'user',
  'chicken_breed',
  'fish_species',
]);
export type EventSource = z.infer<typeof EventSourceEnum>;

// Kategori event yang dicatat
export const EventCategoryEnum = z.enum([
  'alarm',
  'warning',
  'info',
  'feeding',
  'mortality',
  'observation',
  'system',
  'manual',
]);
export type EventCategory = z.infer<typeof EventCategoryEnum>;

// Struktur data event log (flat)
export const EventLogSchema = z.object({
  id: z.number(),

  // Waktu kejadian
  timestamp: z.string(), // ISO 8601

  // Identitas sumber entitas
  source: EventSourceEnum,
  source_id: z.number(),

  // Klasifikasi dan ringkasan
  category: EventCategoryEnum,
  summary: z.string().optional(),
  recorded_by: z.string().optional(), // user_id, 'system', 'rule_engine'

  // Identitas/konteks terkait
  farm_id: z.number().optional(),
  unit_id: z.number().optional(),
  cycle_id: z.number().optional(),
  device_tag: z.string().optional(),
  plant_id: z.number().optional(),

  // Nilai-nilai observasi atau aksi
  value: z.union([z.string(), z.number(), z.boolean()]).optional(),
  previous_value: z.union([z.string(), z.number(), z.boolean()]).optional(),

  feed_type: z.string().optional(),
  amount_gram: z.number().optional(),
  method: z.string().optional(),

  death_count: z.number().optional(),
  cause: z.string().optional(),

  height_cm: z.number().optional(),
  health_score: z.string().optional(),

  note: z.string().optional(),
});

export type EventLog = z.infer<typeof EventLogSchema>;
