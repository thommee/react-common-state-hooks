import { BaseStateChangeSubscription } from './BaseStateChangeSubscription';

import { StateChangeObserver, StateChangeSubscribable, StateChangeSubscription, StateStorage } from '../../../types';

export class SubscribableStorage implements StateChangeSubscribable, StateStorage {
  private readonly observersMap: Map<string, Set<StateChangeObserver<any>>> = new Map();
  constructor(private readonly storage: StateStorage) {}

  subscribeOn<T>(key: string, observer: StateChangeObserver<T>): StateChangeSubscription {
    const observers = (this.observersMap.get(key) ?? new Set()).add(observer);
    this.observersMap.set(key, observers);
    return new BaseStateChangeSubscription(observers, observer);
  }

  getItem<T>(key: string): T | undefined {
    return this.storage.getItem(key);
  }

  setItem<T>(key: string, value: T): void {
    this.storage.setItem(key, value);
    this.notifyObservers(key, value);
  }

  private notifyObservers<T>(key: string, value: T): void {
    this.observersMap.get(key)?.forEach((observer) => {
      observer(value);
    });
  }
}
