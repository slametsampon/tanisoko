// frontend/src/repositories/repository-factory.ts

import { isMockMode } from '../services/mode';

import { ApiUserRepository } from './api/ApiUserRepository';
import { UserRepository } from './interfaces/UserRepository';
import { MockUserRepository } from './mock/MockUserRepository';

export function getUserRepository(): UserRepository {
  return isMockMode() ? new MockUserRepository() : new ApiUserRepository();
}
