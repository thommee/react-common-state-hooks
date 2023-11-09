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
