export interface Storage {
  has(key: string): boolean;
  get(key: string): unknown;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
}

export interface StorageConstructor {
  new (namespace: string): Storage;
}
