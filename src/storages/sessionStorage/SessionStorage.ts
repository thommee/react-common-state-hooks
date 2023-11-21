import { Storage } from '../genericStorage/Storage';

export class SessionStorage implements Storage {
  private readonly storage = new Map<string, unknown>();
  constructor(private readonly namespace: string) {
    this.init();
  }

  private init() {
    this.loadData(this.namespace, this.storage);
  }

  private loadData(namespace: string, storage: Map<string, unknown>) {
    this.storage.clear();
    const rawData = window.sessionStorage.getItem(namespace);
    const data = rawData ? JSON.parse(rawData) : undefined;
    if (typeof data === 'object') {
      for (const key in data) {
        storage.set(key, data[key]);
      }
    }
  }

  private saveData(key: string, storage: Map<string, unknown>) {
    window.sessionStorage.setItem(key, JSON.stringify(storage));
  }

  has(key: string) {
    return this.storage.has(key);
  }

  get(key: string) {
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
