import { UseStorage } from '../../storages/UseStorage';

export const createGenericValueHook = (useStorage: UseStorage) => {
  const useGenericValue = <Value>(key: string, initialValue: Value) => useStorage<Value>(key, initialValue);
  return { useGenericValue };
};
