// frontend/src/services/user.service.ts

import type { UserBase, UserRecord } from '@models/user.model';
import { getUserRepository } from '../repositories/repository-factory';

const repo = getUserRepository();

export const fetchAllUsers = (): Promise<UserRecord[]> => repo.getAll();

export const fetchUserByUsername = (
  username: string
): Promise<UserRecord | undefined> => repo.getById(username);

export const createUser = (user: UserBase): Promise<void> => repo.create(user);

export const updateUser = (
  username: string,
  data: Partial<UserBase>
): Promise<void> => repo.update(username, data);

export const deleteUser = (username: string): Promise<void> =>
  repo.delete(username);
