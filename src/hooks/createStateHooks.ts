import { createUseValueHook } from './useValue/createUseValueHook';
import { createUseListHook } from './useList/createUseListHook';
import { createUseRecordHook } from './useRecord/createUseRecordHook';
import { UseStorage } from '../storages/UseStorage';

export const createStateHooks = <T extends { useStorage: UseStorage }>({ useStorage, ...rest }: T) => {
  const { useValue } = createUseValueHook(useStorage);
  const { useList } = createUseListHook(useStorage);
  const { useRecord } = createUseRecordHook(useStorage);

  return { ...rest, useValue, useList, useRecord };
};
