import { useCallback, useMemo } from 'react';
import { ListOptions, add, remove, applyLimit } from './utils/Collections';
import { UseStorage } from '../../storages/UseStorage';

type UseListApi<ListItem> = [
  list: ListItem[],
  addItem: (listItem: ListItem) => void,
  removeItem: (listItem: ListItem) => void,
  setList: (list: ListItem[]) => void,
];
export const createUseListHook = (useStorage: UseStorage) => {
  const useList = <ListItem>(
    key: string,
    initialValue: ListItem[] = [],
    defaultOptions?: ListOptions<ListItem>,
  ): UseListApi<ListItem> => {
    const [_list, _setList] = useStorage<ListItem[]>(key, initialValue);

    const addItem = useCallback(
      (item: ListItem, options?: ListOptions<ListItem>) => {
        const listOptions = { ...defaultOptions, ...options };
        _setList((l) => applyLimit(add<ListItem>(l, item, listOptions), listOptions));
      },
      [_setList, defaultOptions],
    );
    const removeItem = useCallback(
      (item: ListItem) => {
        _setList((l) => remove<ListItem>(l, item, defaultOptions?.areEqual));
      },
      [defaultOptions?.areEqual, _setList],
    );

    const setList = useCallback(
      (l: ListItem[]) => {
        _setList(applyLimit([...l], defaultOptions));
      },
      [defaultOptions, _setList],
    );

    return useMemo(() => [_list, addItem, removeItem, setList], [addItem, removeItem, _list, setList]);
  };

  return { useList };
};
