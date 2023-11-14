import { StateChangeObserver, Subscription } from './Subscription';
import { Storage } from './Storage';

export class GenericStorage {
  private readonly observersMap: Map<string, Set<StateChangeObserver>> = new Map();

  constructor(private readonly storage: Storage) {}

  subscribeOn(key: string, observer: StateChangeObserver): Subscription {
    const observers = (this.observersMap.get(key) ?? new Set()).add(observer);
    this.observersMap.set(key, observers);
    return new Subscription(observers, observer);
  }

  has(key: string) {
    return this.storage.has(key);
  }

  get<T>(key: string): T | undefined {
    return this.storage.get(key);
  }

  set<T>(key: string, value: T): void {
    this.storage.set(key, value);
    this.notifyObservers(key, this.storage.get(key));
  }

  remove(key: string): void {
    this.storage.remove(key);
    this.notifyObservers(key, this.storage.get(key));
  }

  clear(): void {
    this.storage.clear();
    this.observersMap.forEach((observers, key) => this.notifyObservers(key, this.storage.get(key)));
  }

  private notifyObservers<T>(key: string, value: T): void {
    this.observersMap.get(key)?.forEach((observer) => {
      observer(value);
    });
  }
}
