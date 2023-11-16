import { Storage } from '../genericStorage/Storage';

export class InMemoryStorage implements Storage {
  private readonly storage: Map<string, unknown> = new Map();

  has(key: string) {
    return this.storage.has(key);
  }

  get(key: string) {
    return this.storage.get(key);
  }

  set<T>(key: string, value: T): void {
    this.storage.set(key, value);
  }

  remove(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
