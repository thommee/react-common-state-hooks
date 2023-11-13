import { useCallback, useMemo } from 'react';
import { SetValue, UseStorage } from '../../storages/UseStorage';

type UseGenericRecordApi<RecordItem> = [
  record: Record<string, RecordItem>,
  addItem: (key: string, listItem: RecordItem) => void,
  removeItem: (key: string) => void,
  setRecord: SetValue<Record<string, RecordItem>>
]
export const createGenericRecordHook = (useStorage: UseStorage) => {
  const useGenericRecord = <RecordItem>(name: string, initialValue: Record<string, RecordItem> = {}): UseGenericRecordApi<RecordItem> => {
    const [record, setRecord] = useStorage<Record<string, RecordItem>>(name, initialValue);

    const addItem = useCallback((key: string, item: RecordItem) => setRecord((r) => ({ ...r, [key]: item })), [setRecord]);
    const removeItem = useCallback((key: string) => {
        setRecord((r) => {
          const newRecord = { ...r };
          delete newRecord[key];
          return newRecord;
        });
      },
      [setRecord],
    );

    return useMemo(() => ([record, addItem, removeItem, setRecord]), [addItem, removeItem, record, setRecord]);
  };

  return { useGenericRecord };
};
