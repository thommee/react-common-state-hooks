import { useEffect, useMemo, useState } from 'react';
import { SubscribableStateStorage } from './SubscribableStateStorage';

type UseStorageApi<T> = [value: T, setValue: (value: T) => void];
export const useStorage = <T>(storage: SubscribableStateStorage, key: string, initialValue: T): UseStorageApi<T> => {
  const [value, setValue] = useState(storage.getItem(key) ?? initialValue);

  useEffect(() => {
    const subscription = storage.subscribeOn(key, setValue);
    return () => subscription.unsubscribe();
  }, [key, storage]);

  return useMemo(() => [value, (newValue) => storage.setItem(key, newValue)], [key, storage, value]);
};
