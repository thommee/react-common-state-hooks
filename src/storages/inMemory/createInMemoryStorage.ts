import { InMemoryStorageFactory } from './InMemoryStorageFactory';
import { UseStorageApi } from '../UseStorage';
import { useGenericStorage } from '../genericStorage/useGenericStorage';

export const createInMemoryStorage = (namespace: string) => {
  const storage = InMemoryStorageFactory.getStorage(namespace);

  const useStorage = <T>(key: string, initialValue: T): UseStorageApi<T> =>
    useGenericStorage(storage, key, initialValue);

  return { useStorage };
};
