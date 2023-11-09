import { StateStorage } from '../../types';

export class InMemoryStorage implements StateStorage {
  private readonly storage: Map<string, any> = new Map();
  getItem<T>(key: string): T | undefined {
    return this.storage.get(key);
  }

  setItem<T>(key: string, value: T): void {
    this.storage.set(key, value);
  }
}
