import { UseStorageApi } from '../UseStorage';
import { useGenericStorage } from './useGenericStorage';
import { GenericStorageFactory } from './GenericStorageFactory';
import { Storage } from './Storage';

export const createUseGenericStorage = (storageConstructor: new (...args: any) => Storage, namespace: string) => {
  const storage = GenericStorageFactory.getStorage(storageConstructor, namespace);
  const useStorage = <T>(key: string, initialValue: T): UseStorageApi<T> =>
    useGenericStorage(storage, key, initialValue);

  return { useStorage };
};
