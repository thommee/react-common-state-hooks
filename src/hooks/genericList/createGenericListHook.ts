import { useCallback, useMemo } from 'react';
import { ListOptions, AreListItemsEqual, add, remove } from './utils/Collections';
import { UseStorage } from '../../storages/UseStorage';

export const createGenericListHook = (useStorage: UseStorage) => {
  const defaultAreEqual = <T>(a: T, b: T) => a === b;
  const useGenericList = <ListItem>(
    key: string,
    initialValue: ListItem[] = [],
    areEqual: AreListItemsEqual<ListItem> = defaultAreEqual,
    defaultOptions?: ListOptions,
  ) => {
    const [list, setList] = useStorage<ListItem[]>(key, initialValue);

    const addItem = useCallback(
      (item: ListItem, options?: ListOptions) => {
         setList((l) => add<ListItem>(l, item, areEqual, { ...defaultOptions, ...options }));
      },
      [setList, areEqual, defaultOptions],
    );
    const removeItem = useCallback(
      (item: ListItem) => {
        setList(remove<ListItem>(list, item, areEqual));
      },
      [areEqual, list, setList],
    );

    return useMemo(() => ({ addItem, removeItem, list, setList }), [addItem, removeItem, list, setList]);
  };

  return { useGenericList };
};
