import { createUseInMemoryStorage } from './storages/inMemory';
import { createGenericValueHook } from './hooks/genericValue/createGenericValueHook';
import { createGenericListHook } from './hooks/genericList/createGenericListHook';
import { createGenericRecordHook } from './hooks/genericRecord/createGenericRecordHook';

export const createInMemoryStateHooks = (namespace: string) => {
  const { useStorage } = createUseInMemoryStorage(namespace);
  const { useGenericValue } = createGenericValueHook(useStorage);
  const { useGenericList } = createGenericListHook(useStorage);
  const { useGenericRecord } = createGenericRecordHook(useStorage);

  return { useGenericValue, useGenericList, useGenericRecord };
};
