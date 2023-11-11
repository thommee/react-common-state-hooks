export type UseStorageApi<T> = [value: T, setValue: (value: T) => void];
export type UseStorage = <T>(key: string, initialValue: T) => UseStorageApi<T>;
