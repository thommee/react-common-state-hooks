import { createLocalStorageStorage } from './storages/localStorage';
import { createGenericValueHook } from './hooks/genericValue/createGenericValueHook';
import { createGenericListHook } from './hooks/genericList/createGenericListHook';
import { createGenericRecordHook } from './hooks/genericRecord/createGenericRecordHook';

export const createLocalStorageStateHooks = (namespace: string) => {
  const { useStorage } = createLocalStorageStorage(namespace);
  const { useGenericValue } = createGenericValueHook(useStorage);
  const { useGenericList } = createGenericListHook(useStorage);
  const { useGenericRecord } = createGenericRecordHook(useStorage);

  return { useGenericValue, useGenericList, useGenericRecord };
};
