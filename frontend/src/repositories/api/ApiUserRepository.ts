// frontend/src/repositories/api/ApiUserRepository.ts

import { UserRepository } from '../interfaces/UserRepository';
import { UserBase, UserRecord } from '@models/user.model';

export class ApiUserRepository implements UserRepository {
  private baseUrl = '/api/users';

  async getAll(): Promise<UserRecord[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error('Failed to fetch users');
    return await res.json();
  }

  async getById(username: string): Promise<UserRecord | undefined> {
    const res = await fetch(`${this.baseUrl}/${username}`);
    if (!res.ok) return undefined;
    return await res.json();
  }

  async create(user: UserBase): Promise<void> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Failed to create user');
  }

  async update(username: string, user: Partial<UserBase>): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${username}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Failed to update user');
  }

  async delete(username: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${username}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete user');
  }
}
