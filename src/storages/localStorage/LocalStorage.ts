import { Storage } from '../genericStorage/Storage';

export class LocalStorage implements Storage {
  private readonly storage = new Map<string, any>();
  constructor(private readonly namespace: string) {
    this.init();
  }

  private init() {
    this.loadData(this.namespace, this.storage);
  }

  private loadData(key: string, storage: Map<string, unknown>) {
    this.storage.clear();
    const rawData = window.localStorage.getItem(key);
    const data = rawData ? JSON.parse(rawData) : undefined;
    if (typeof data === 'object') {
      for (key in data) {
        storage.set(key, data[key]);
      }
    }
  }

  private saveData(key: string, storage: Map<string, unknown>) {
    window.localStorage.setItem(key, JSON.stringify(storage));
  }

  has(key: string) {
    return this.storage.has(key);
  }

  get<T>(key: string): T | undefined {
    return this.storage.get(key);
  }

  set<T>(key: string, value: T): void {
    this.storage.set(key, value);
    this.saveData(this.namespace, this.storage);
  }

  remove(key: string): void {
    this.storage.delete(key);
    this.saveData(this.namespace, this.storage);
  }

  clear(): void {
    this.storage.clear();
    this.saveData(this.namespace, this.storage);
  }
}
