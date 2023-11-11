import { useCallback, useMemo } from 'react';
import { UseStorage } from '../../storages/UseStorage';

export const createGenericRecordHook = (useStorage: UseStorage) => {
  const useGenericRecord = <T>(name: string, initialValue: Record<string, T> = {}) => {
    const [record, setRecord] = useStorage<Record<string, T>>(name, initialValue);

    const addItem = useCallback((key: string, item: T) => setRecord({ ...record, [key]: item }), [record, setRecord]);
    const removeItem = useCallback(
      (key: string) => {
        const newRecord = { ...record };
        delete newRecord[key];
        setRecord(newRecord);
      },
      [record, setRecord],
    );

    return useMemo(() => ({ addItem, removeItem, record, setRecord }), [addItem, removeItem, record, setRecord]);
  };

  return { useGenericRecord };
};
