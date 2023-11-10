import { useSubscribableStorage } from './subscribableStorage/useSubscribableStorage';
import { SubscribableStorage } from './subscribableStorage/SubscribableStorage';
import { InMemoryStorage } from './InMemoryStorage';
import { UseStorageApi } from '../../types';

export const createInMemoryStorage = () => {
  const storage = new SubscribableStorage(new InMemoryStorage());
  const useStorage = <T>(key: string, initialValue: T): UseStorageApi<T> =>
    useSubscribableStorage(storage, key, initialValue);

  return { useStorage };
};
