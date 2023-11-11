import { useEffect, useMemo, useState } from 'react';
import { InMemoryStorage } from './InMemoryStorage';
import { UseStorageApi } from '../UseStorage';

export const useInMemoryStorage = <T>(storage: InMemoryStorage, key: string, initialValue: T): UseStorageApi<T> => {
  const [value, setValue] = useState(storage.getItem(key) ?? initialValue);

  useEffect(() => {
    const subscription = storage.subscribeOn(key, setValue);
    return () => subscription.unsubscribe();
  }, [key, storage]);

  return useMemo(() => [value, (newValue: T) => storage.setItem(key, newValue)], [key, storage, value]);
};
