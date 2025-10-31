// frontend/src/event-log/event-log-store.ts

import { eventLogService } from '../services/event-log.service';
import type { EventLog } from 'src/models/event-log.model';

const MAX_EVENTS = 30; // 🔧 bisa disesuaikan

export const eventLogStore: {
  items: EventLog[];
} = {
  items: [],
};

export async function loadEventLogData() {
  const initial = await eventLogService.loadAll();
  eventLogStore.items = [...initial];

  // ⛔️ Pastikan tidak melebihi batas saat load awal
  if (eventLogStore.items.length > MAX_EVENTS) {
    eventLogStore.items.length = MAX_EVENTS;
  }
}

export function addEventLog(entry: Omit<EventLog, 'id' | 'timestamp'>): void {
  const log = eventLogService.add(entry);

  eventLogStore.items.unshift(log);

  // ⛔️ Pangkas jika lebih dari batas
  if (eventLogStore.items.length > MAX_EVENTS) {
    eventLogStore.items.length = MAX_EVENTS;
  }
}
