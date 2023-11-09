import { SubscribableStateStorage } from '../../subscribableStateStorage/SubscribableStateStorage';
import { useStorage } from '../../subscribableStateStorage/useStorage';
export const createGenericValueHook = (storage: SubscribableStateStorage) => {
  const useGenericValue = <T>(key: string, initialState?: T) => useStorage(storage, key, initialState);
  return { useGenericValue };
};
