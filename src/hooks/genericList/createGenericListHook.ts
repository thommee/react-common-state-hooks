import { useCallback, useMemo } from 'react';
import { ListOptions, AreListItemsEqual, add, remove } from './utils/Collections';
import { SetValue, UseStorage } from '../../storages/UseStorage';

type UseGenericListApi<ListItem> = [
  list: ListItem[],
  addItem: (listItem: ListItem) => void,
  removeItem: (listItem: ListItem) => void,
  setList: SetValue<ListItem[]>
]
export const createGenericListHook = (useStorage: UseStorage) => {
  const defaultAreEqual = <T>(a: T, b: T) => a === b;
  const useGenericList = <ListItem>(
    key: string,
    initialValue: ListItem[] = [],
    areEqual: AreListItemsEqual<ListItem> = defaultAreEqual,
    defaultOptions?: ListOptions,
  ): UseGenericListApi<ListItem> => {
    const [list, setList] = useStorage<ListItem[]>(key, initialValue);

    const addItem = useCallback(
      (item: ListItem, options?: ListOptions) => {
         setList((l) => add<ListItem>(l, item, areEqual, { ...defaultOptions, ...options }));
      },
      [setList, areEqual, defaultOptions],
    );
    const removeItem = useCallback(
      (item: ListItem) => {
        setList((l) => remove<ListItem>(l, item, areEqual));
      },
      [areEqual, setList],
    );

    return useMemo(() => ([list, addItem, removeItem, setList]), [addItem, removeItem, list, setList]);
  };

  return { useGenericList };
};
