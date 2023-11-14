import { InMemoryStorage } from './InMemoryStorage';
import { GenericStorage } from '../genericStorage/GenericStorage';

export class InMemoryStorageFactory {
  private static storages: Map<string, GenericStorage> = new Map();
  static getStorage(namespace: string) {
    if (!InMemoryStorageFactory.storages.has(namespace)) {
      InMemoryStorageFactory.storages.set(namespace, new GenericStorage(new InMemoryStorage()));
    }
    return InMemoryStorageFactory.storages.get(namespace) as GenericStorage;
  }
}
