import { GenericStorage } from './GenericStorage';
import { StorageConstructor } from './Storage';

export class GenericStorageFactory {
  private static genericStorages: Map<StorageConstructor, GenericStorageFactory> = new Map();
  private storages: Map<string, GenericStorage> = new Map();
  private constructor(private readonly storageConstructor: StorageConstructor) {}
  getStorage(namespace: string) {
    if (!this.storages.has(namespace)) {
      this.storages.set(namespace, new GenericStorage(new this.storageConstructor(namespace)));
    }
    return this.storages.get(namespace) as GenericStorage;
  }

  private static getFactory(storageConstructor: StorageConstructor) {
    if (!GenericStorageFactory.genericStorages.has(storageConstructor)) {
      GenericStorageFactory.genericStorages.set(storageConstructor, new GenericStorageFactory(storageConstructor));
    }
    return GenericStorageFactory.genericStorages.get(storageConstructor) as GenericStorageFactory;
  }

  static getStorage(storage: StorageConstructor, namespace: string) {
    return GenericStorageFactory.getFactory(storage).getStorage(namespace);
  }
}
