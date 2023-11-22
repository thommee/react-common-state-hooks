import { SetValue, UseStorage } from '../../storages/UseStorage';

type UseValueApi<Value> = [value: Value, setValue: SetValue<Value>];

export const createUseValueHook = (useStorage: UseStorage) => {
  const useValue = <Value>(key: string, initialValue: Value): UseValueApi<Value> =>
    useStorage<Value>(key, initialValue);
  return { useValue };
};
