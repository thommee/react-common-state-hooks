import { UseStorage } from '../../types';

export const createGenericValueHook = (useStorage: UseStorage) => {
  const useGenericValue = <T>(key: string, initialState: T) => useStorage<T>(key, initialState);
  return { useGenericValue };
};
