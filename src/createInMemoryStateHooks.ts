import { createGenericValueHook } from './hooks/genericValue/createGenericValueHook';
import { createGenericListHook } from './hooks/genericList/createGenericListHook';
import { createInMemoryStorage } from './storages/inMemory';

export const createInMemoryStateHooks = () => {
  const { useStorage } = createInMemoryStorage();
  const { useGenericValue } = createGenericValueHook(useStorage);
  const { useGenericList } = createGenericListHook(useStorage);

  return {
    useGenericValue,
    useGenericList,
  };
};
