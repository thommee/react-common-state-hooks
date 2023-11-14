import { createGenericValueHook } from './genericValue/createGenericValueHook';
import { createGenericListHook } from './genericList/createGenericListHook';
import { createGenericRecordHook } from './genericRecord/createGenericRecordHook';
import { UseStorage } from '../storages/UseStorage';

export const createStateHooks = <T extends { useStorage: UseStorage }>({ useStorage, ...rest }: T) => {
  const { useGenericValue } = createGenericValueHook(useStorage);
  const { useGenericList } = createGenericListHook(useStorage);
  const { useGenericRecord } = createGenericRecordHook(useStorage);

  return { useStorage, ...rest, useGenericValue, useGenericList, useGenericRecord };
};
