import { LocalStorageStorage } from './LocalStorageStorage';
import { GenericStorage } from '../genericStorage/GenericStorage';

export class LocalStorageStorageFactory {
  private static storages: Map<string, GenericStorage> = new Map();
  static getStorage(namespace: string) {
    if (!LocalStorageStorageFactory.storages.has(namespace)) {
      LocalStorageStorageFactory.storages.set(namespace, new GenericStorage(new LocalStorageStorage(namespace)));
    }
    return LocalStorageStorageFactory.storages.get(namespace) as GenericStorage;
  }
}
