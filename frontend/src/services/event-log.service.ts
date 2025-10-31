// frontend/src/services/event-log.service.ts

import type { EventLog } from 'src/models/event-log.model.ts';
import { fetchMockData } from './mock-data.service';

export class EventLogService {
  private cache: EventLog[] = [];

  async loadAll(): Promise<EventLog[]> {
    if (this.cache.length === 0) {
      this.cache = await fetchMockData<EventLog[]>('event_log.json');
    }
    return this.cache;
  }

  getAll(): EventLog[] {
    return [...this.cache]; // return copy to avoid mutation
  }

  add(entry: Omit<EventLog, 'id' | 'timestamp'>): EventLog {
    const newLog: EventLog = {
      id: this.getNextId(),
      timestamp: new Date().toISOString(),
      ...entry,
    };
    this.cache.unshift(newLog);
    return newLog;
  }

  private getNextId(): number {
    const ids = this.cache.map((e) => e.id ?? 0);
    return Math.max(0, ...ids) + 1;
  }

  clearCache() {
    this.cache = [];
  }
}

export const eventLogService = new EventLogService();
