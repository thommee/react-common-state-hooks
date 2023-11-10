export interface StateChangeSubscription {
  unsubscribe(): void;
}

export interface StateChangeObserver<T> {
  (value: T): void;
}

export interface StateChangeSubscribable {
  subscribeOn<T>(key: string, onNext: StateChangeObserver<T>): StateChangeSubscription;
}

export interface StateStorage {
  setItem<T>(key: string, value: T): void;
  getItem<T>(key: string): T | undefined;
}

export type UseStorageApi<T> = [value: T, setValue: (value: T) => void];
export type UseStorage = <T>(key: string, initialValue: T) => UseStorageApi<T>;
