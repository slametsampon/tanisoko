// frontend/src/repositories/interfaces/BaseRepository.ts

export interface BaseRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T | null>;
  create(data: T): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<boolean>;
}
