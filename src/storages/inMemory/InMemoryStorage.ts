import { Subscription, StateChangeObserver } from './Subscription';

export class InMemoryStorage {
  private readonly observersMap: Map<string, Set<StateChangeObserver>> = new Map();
  private readonly storage: Map<string, any> = new Map();

  subscribeOn(key: string, observer: StateChangeObserver): Subscription {
    const observers = (this.observersMap.get(key) ?? new Set()).add(observer);
    this.observersMap.set(key, observers);
    return new Subscription(observers, observer);
  }

  getItem<T>(key: string): T | undefined {
    return this.storage.get(key);
  }

  setItem<T>(key: string, value: T): void {
    this.storage.set(key, value);
    this.notifyObservers(key, value);
  }

  private notifyObservers<T>(key: string, value: T): void {
    this.observersMap.get(key)?.forEach((observer) => {
      observer(value);
    });
  }
}
