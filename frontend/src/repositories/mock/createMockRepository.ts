// frontend/src/repositories/mock/createMockRepository.ts

import { BaseRepository } from '../interfaces/BaseRepository';
import { fetchMockData } from '../../services/mock-data.service';

export function createMockRepository<T extends { id: number }>(
  model: string
): BaseRepository<T> {
  const prefix = `[MockRepo:${model}]`;
  const dataFile = `${model}.json`;

  let items: T[] = [];
  let idCounter = 1;
  let initialized = false;

  const init = async () => {
    if (initialized) return;

    try {
      items = await fetchMockData<T[]>(dataFile);
      idCounter = items.length
        ? Math.max(...items.map((item) => item.id ?? 0)) + 1
        : 1;

      console.log(
        `${prefix} Initialized with ${items.length} items, idCounter=${idCounter}`
      );
    } catch (err) {
      console.warn(`${prefix} ⚠️ Inisialisasi gagal, menggunakan data kosong.`);
      items = [];
      idCounter = 1;
    }

    initialized = true;
  };

  return {
    async getAll() {
      console.log(`${prefix} getAll()`);
      await init();
      return [...items]; // Trigger reactivity
    },

    async getById(id: number) {
      console.log(`${prefix} getById(${id})`);
      await init();
      const item = items.find((i) => i.id === id) || null;
      console.log(`${prefix} getById →`, item);
      return item;
    },

    async create(data: T) {
      await init();
      const newItem = { ...data, id: idCounter++ };
      items.push(newItem);
      console.log(`${prefix} create →`, newItem);
      return newItem;
    },

    async update(id: number, data: Partial<T>) {
      await init();
      const index = items.findIndex((i) => i.id === id);
      if (index === -1) {
        console.warn(`${prefix} update(${id}) → not found`);
        throw new Error('Item not found');
      }
      items[index] = { ...items[index], ...data };
      console.log(`${prefix} update(${id}) →`, items[index]);
      return items[index];
    },

    async delete(id: number) {
      await init();
      const index = items.findIndex((i) => i.id === id);
      if (index === -1) {
        console.warn(`${prefix} delete(${id}) → not found`);
        return false;
      }
      const [deleted] = items.splice(index, 1);
      console.log(`${prefix} delete(${id}) →`, deleted);
      return true;
    },
  };
}
