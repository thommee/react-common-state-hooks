import { useCallback, useMemo } from 'react';
import { ListOptions, AreListItemsEqual, inPlaceAdd, inPlaceRemove } from './utils/Collections';
import { UseStorage } from '../../storages/UseStorage';

export const createGenericListHook = (useStorage: UseStorage) => {
  const useGenericList = <T>(
    key: string,
    initialValue: T[] = [],
    areEqual: AreListItemsEqual = (a, b) => a === b,
    defaultOptions?: ListOptions,
  ) => {
    const [list, setList] = useStorage<T[]>(key, initialValue);

    const addItem = useCallback(
      (item: T, options?: ListOptions) => {
        setList(inPlaceAdd<T>(list, item, areEqual, { ...defaultOptions, ...options }));
      },
      [areEqual, defaultOptions, list, setList],
    );
    const removeItem = useCallback(
      (item: T) => {
        setList(inPlaceRemove<T>(list, item, areEqual));
      },
      [areEqual, list, setList],
    );

    return useMemo(() => ({ addItem, removeItem, list, setList }), [addItem, removeItem, list, setList]);
  };

  return { useGenericList };
};
