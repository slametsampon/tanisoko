// frontend/src/repositories/mock/MockUserRepository.ts

import { UserRepository } from '../interfaces/UserRepository';
import { UserBase, UserRecord } from '@models/user.model';
import { fetchMockData } from 'src/services/mock-data.service';

export class MockUserRepository implements UserRepository {
  private cache: UserRecord[] | null = null;

  async getAll(): Promise<UserRecord[]> {
    if (!this.cache) {
      const raw = await fetchMockData<any>('users.json');
      // Normalisasi: jika raw.users ada, pakai itu
      this.cache = Array.isArray(raw) ? raw : raw.users ?? [];
    }
    console.log('[MockUserRepository] Loaded users:', this.cache);
    return this.cache!;
  }

  async getById(username: string): Promise<UserRecord | undefined> {
    const all = await this.getAll();
    return all.find((user) => user.username === username);
  }

  async create(user: UserBase): Promise<void> {
    const all = await this.getAll();
    const newRecord: UserRecord = {
      ...user,
      passwordHash: user.password ?? '', // ⚠️ biasanya hash di backend
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    all.push(newRecord);
  }

  async update(username: string, user: Partial<UserBase>): Promise<void> {
    const all = await this.getAll();
    const index = all.findIndex((u) => u.username === username);
    if (index !== -1) {
      all[index] = {
        ...all[index],
        ...user,
        updatedAt: Date.now(),
      };
    }
  }

  async delete(username: string): Promise<void> {
    const all = await this.getAll();
    this.cache = all.filter((u) => u.username !== username);
  }
}
