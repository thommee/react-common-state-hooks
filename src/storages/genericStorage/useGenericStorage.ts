import { useCallback, useEffect, useMemo, useState } from 'react';
import { UseStorageApi } from '../UseStorage';
import { GenericStorage } from './GenericStorage';

export const useGenericStorage = <T>(storage: GenericStorage, key: string, initialValue: T): UseStorageApi<T> => {
  const [value, setValue] = useState(storage.get(key) ?? initialValue);

  useEffect(() => {
    const subscription = storage.subscribeOn(key, setValue);
    return () => subscription.unsubscribe();
  }, [key, storage]);

  const set = useCallback<UseStorageApi<T>[1]>(
    (newValue) => {
      storage.set(
        key,
        newValue instanceof Function ? newValue(storage.has(key) ? (storage.get(key) as T) : initialValue) : newValue,
      );
    },
    [initialValue, key, storage],
  );

  return useMemo(() => [value, set], [set, value]);
};
