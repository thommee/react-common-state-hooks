import { createGenericListHook } from './hooks/genericList/createGenericListHook';
import { createGenericValueHook } from './hooks/genericValue/createGenericValueHook';
import { createReduxStorage } from './storages/redux';
import { createGenericRecordHook } from './hooks/genericRecord/createGenericRecordHook';

export const createReduxStateHooks = (namespace: string) => {
  const { createSelector, useStorage, slice } = createReduxStorage(namespace);
  const { useGenericValue } = createGenericValueHook(useStorage);
  const { useGenericList } = createGenericListHook(useStorage);
  const { useGenericRecord } = createGenericRecordHook(useStorage);

  return { slice, createSelector, useGenericValue, useGenericList, useGenericRecord };
};
