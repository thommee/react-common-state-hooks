import { createGenericListHook } from './hooks/genericList/createGenericListHook';
import { createGenericValueHook } from './hooks/genericValue/createGenericValueHook';
import { createReduxStorage } from './storages/redux';

export const createReduxStateHooks = (namespace: string) => {
  const { createSelector, useStorage, slice } = createReduxStorage(namespace);
  const { useGenericValue } = createGenericValueHook(useStorage);
  const { useGenericList } = createGenericListHook(useStorage);

  return { slice, createSelector, useGenericValue, useGenericList };
};
