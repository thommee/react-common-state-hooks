import { useCallback, useEffect, useMemo, useState } from 'react';
import { InMemoryStorage } from './InMemoryStorage';
import { UseStorageApi } from '../UseStorage';

export const useInMemoryStorage = <T>(storage: InMemoryStorage, key: string, initialValue: T): UseStorageApi<T> => {
  const [value, setValue] = useState(storage.getItem(key) ?? initialValue);

  useEffect(() => {
    const subscription = storage.subscribeOn(key, setValue);
    return () => subscription.unsubscribe();
  }, [key, storage]);

  const set = useCallback<UseStorageApi<T>[1]>((newValue) => {
    storage.setItem(key, newValue instanceof Function ? newValue(
      storage.has(key) ? (storage.getItem(key) as T) : initialValue) : newValue);
  }, [initialValue, key, storage]);

  return useMemo(() => [value, set], [set, value]);
};
