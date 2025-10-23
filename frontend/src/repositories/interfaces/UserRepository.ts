// frontend/src/repositories/interfaces/UserRepository.ts

import { UserBase, UserRecord } from '@models/user.model';

export interface UserRepository {
  getAll(): Promise<UserRecord[]>;
  getById(username: string): Promise<UserRecord | undefined>;
  create(user: UserBase): Promise<void>;
  update(username: string, user: Partial<UserBase>): Promise<void>;
  delete(username: string): Promise<void>;
}
