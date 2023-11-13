import { useCallback, useMemo } from 'react';
import { ListOptions, AreListItemsEqual, add, remove } from './utils/Collections';
import { UseStorage } from '../../storages/UseStorage';

export const createGenericListHook = (useStorage: UseStorage) => {
  const useGenericList = <ListItem>(
    key: string,
    initialValue: ListItem[] = [],
    areEqual: AreListItemsEqual<ListItem> = (a, b) => a === b,
    defaultOptions?: ListOptions,
  ) => {
    const [list, setList] = useStorage<ListItem[]>(key, initialValue);

    const addItem = useCallback(
      (item: ListItem, options?: ListOptions) => {
         setList(add<ListItem>(list, item, areEqual, { ...defaultOptions, ...options }));
      },
      [areEqual, defaultOptions, list, setList],
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
