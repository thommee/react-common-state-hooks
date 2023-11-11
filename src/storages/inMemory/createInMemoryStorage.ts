import { InMemoryStorageFactory } from './InMemoryStorageFactory';
import { UseStorageApi } from '../UseStorage';
import { useInMemoryStorage } from './useInMemoryStorage';

export const createInMemoryStorage = (namespace: string) => {
  const storage = InMemoryStorageFactory.getStorage(namespace);
  const useStorage = <T>(key: string, initialValue: T): UseStorageApi<T> =>
    useInMemoryStorage(storage, key, initialValue);

  return { useStorage };
};
