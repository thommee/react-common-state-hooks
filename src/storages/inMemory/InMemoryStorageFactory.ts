import { InMemoryStorage } from './InMemoryStorage';

export class InMemoryStorageFactory {
  private static storages: Map<string, InMemoryStorage> = new Map();
  static getStorage(namespace: string): InMemoryStorage {
    if (!InMemoryStorageFactory.storages.has(namespace)) {
      InMemoryStorageFactory.storages.set(namespace, new InMemoryStorage());
    }
    return InMemoryStorageFactory.storages.get(namespace) as InMemoryStorage;
  }
}
