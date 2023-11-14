import { LocalStorageStorageFactory } from './LocalStorageStorageFactory';
import { UseStorageApi } from '../UseStorage';
import { useGenericStorage } from '../genericStorage/useGenericStorage';

export const createLocalStorageStorage = (namespace: string) => {
  const storage = LocalStorageStorageFactory.getStorage(namespace);
  const useStorage = <T>(key: string, initialValue: T): UseStorageApi<T> =>
    useGenericStorage(storage, key, initialValue);

  return { useStorage };
};
