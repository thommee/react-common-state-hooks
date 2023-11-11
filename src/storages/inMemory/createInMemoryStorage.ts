import { InMemoryStorage } from './InMemoryStorage';
import { UseStorageApi } from '../UseStorage';
import { useInMemoryStorage } from './useInMemoryStorage';

export const createInMemoryStorage = () => {
  const storage = new InMemoryStorage();
  const useStorage = <T>(key: string, initialValue: T): UseStorageApi<T> =>
    useInMemoryStorage(storage, key, initialValue);

  return { useStorage };
};
