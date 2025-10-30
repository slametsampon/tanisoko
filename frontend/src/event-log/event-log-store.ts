// frontend/src/event-log/event-log-store.ts

import { eventLogService } from '../services/event-log.service';
import type { EventLog } from '@models/event-log.model';

export const eventLogStore: {
  items: EventLog[];
} = {
  items: [],
};

export async function loadEventLogData() {
  eventLogStore.items = await eventLogService.loadAll();
}

export function addEventLog(entry: Omit<EventLog, 'id' | 'timestamp'>): void {
  const log = eventLogService.add(entry);
  eventLogStore.items.unshift(log);
}
