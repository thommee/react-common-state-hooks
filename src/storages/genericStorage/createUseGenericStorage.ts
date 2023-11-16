import { UseStorageApi } from '../UseStorage';
import { useGenericStorage } from './useGenericStorage';
import { GenericStorageFactory } from './GenericStorageFactory';
import { StorageConstructor } from './Storage';

export const createUseGenericStorage = (storageConstructor: StorageConstructor, namespace: string) => {
  const storage = GenericStorageFactory.getStorage(storageConstructor, namespace);
  const useStorage = <T>(key: string, initialValue: T): UseStorageApi<T> =>
    useGenericStorage(storage, key, initialValue);

  return { useStorage };
};
