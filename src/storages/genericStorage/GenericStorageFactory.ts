import { GenericStorage } from './GenericStorage';
import { Storage } from './Storage';

export class GenericStorageFactory {
  private static genericStorages: Map<new () => Storage, GenericStorageFactory> = new Map();
  private storages: Map<string, GenericStorage> = new Map();
  private constructor(private readonly storage: new () => Storage) {}
  getStorage(namespace: string) {
    if (!this.storages.has(namespace)) {
      this.storages.set(namespace, new GenericStorage(new this.storage()));
    }
    return this.storages.get(namespace) as GenericStorage;
  }

  private static getFactory(storage: new (...args: any) => Storage) {
    if (!GenericStorageFactory.genericStorages.has(storage)) {
      GenericStorageFactory.genericStorages.set(storage, new GenericStorageFactory(storage));
    }
    return GenericStorageFactory.genericStorages.get(storage) as GenericStorageFactory;
  }

  static getStorage(storage: new (...args: any) => Storage, namespace: string) {
    return GenericStorageFactory.getFactory(storage).getStorage(namespace);
  }
}
