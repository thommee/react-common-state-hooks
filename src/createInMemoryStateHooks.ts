import { SubscribableStateStorage } from './subscribableStateStorage/SubscribableStateStorage';
import { InMemoryStorage } from './storages/inMemory/InMemoryStorage';
import { createGenericValueHook } from './hooks/genericValue/createGenericValueHook';
import { createGenericListHook } from './hooks/genericList/createGenericListHook';

export const createInMemoryStateHooks = () => {
  const storage = new SubscribableStateStorage(new InMemoryStorage());
  const { useGenericValue } = createGenericValueHook(storage);
  const { useGenericList } = createGenericListHook(storage);

  return {
    useGenericValue,
    useGenericList,
  };
};
