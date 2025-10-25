// frontend/src/repositories/mock/createMockRepository.ts

import { BaseRepository } from '../interfaces/BaseRepository';

export function createMockRepository<T>(model: string): BaseRepository<T> {
  const prefix = `[MockRepo:${model}]`;

  let items: T[] = [];
  let idCounter = 100;

  const load = async () => {
    if (items.length > 0) return;

    const url = `./assets/mocks/${model}.json`;
    console.log(`${prefix} Loading data from: ${url}`);

    try {
      const res = await fetch(url);
      console.log(`${prefix} Response status: ${res.status}`);

      if (!res.ok) throw new Error(`HTTP ${res.status} while fetching ${url}`);

      items = await res.json();
      console.log(`${prefix} Loaded items:`, items);

      idCounter = items.length
        ? Math.max(...items.map((x: any) => x.id || 0)) + 1
        : 1;

      console.log(`${prefix} Initialized idCounter = ${idCounter}`);
    } catch (err) {
      console.error(`${prefix} ❌ Failed to load mock data:`, err);
      items = [];
    }
  };

  return {
    async getAll() {
      console.log(`${prefix} getAll() called`);
      await load();
      return [...items]; // ✅ Return new array to trigger UI reactivity
    },

    async getById(id: number) {
      console.log(`${prefix} getById(${id}) called`);
      await load();
      const found = items.find((item) => (item as any).id === id) || null;
      console.log(`${prefix} Found:`, found);
      return found;
    },

    async create(data: T) {
      await load();
      const newItem = { ...data, id: idCounter++ } as T;
      items.push(newItem);
      console.log(`${prefix} create() →`, newItem);
      return newItem;
    },

    async update(id: number, data: Partial<T>) {
      await load();
      const index = items.findIndex((item) => (item as any).id === id);

      if (index === -1) {
        console.warn(`${prefix} update(${id}) → item not found`);
        throw new Error('Item not found');
      }

      items[index] = { ...items[index], ...data };
      console.log(`${prefix} update(${id}) →`, items[index]);
      return items[index];
    },

    async delete(id: number) {
      await load();
      const index = items.findIndex((item) => (item as any).id === id);

      if (index === -1) {
        console.warn(`${prefix} delete(${id}) → item not found`);
        return false;
      }

      const deleted = items.splice(index, 1);
      console.log(`${prefix} delete(${id}) → success`, deleted[0]);
      return true;
    },
  };
}
