import { useCallback, useMemo } from 'react';
import { ListOptions, add, remove } from './utils/Collections';
import { SetValue, UseStorage } from '../../storages/UseStorage';

type UseGenericListApi<ListItem> = [
  list: ListItem[],
  addItem: (listItem: ListItem) => void,
  removeItem: (listItem: ListItem) => void,
  setList: SetValue<ListItem[]>,
];
export const createGenericListHook = (useStorage: UseStorage) => {
  const useGenericList = <ListItem>(
    key: string,
    initialValue: ListItem[] = [],
    defaultOptions?: ListOptions<ListItem>,
  ): UseGenericListApi<ListItem> => {
    const [list, setList] = useStorage<ListItem[]>(key, initialValue);

    const addItem = useCallback(
      (item: ListItem, options?: ListOptions<ListItem>) => {
        setList((l) => add<ListItem>(l, item, { ...defaultOptions, ...options }));
      },
      [setList, defaultOptions],
    );
    const removeItem = useCallback(
      (item: ListItem) => {
        setList((l) => remove<ListItem>(l, item, defaultOptions?.areEqual));
      },
      [defaultOptions?.areEqual, setList],
    );

    return useMemo(() => [list, addItem, removeItem, setList], [addItem, removeItem, list, setList]);
  };

  return { useGenericList };
};
