export interface StateChangeObserver<T> {
  (value: T): void;
}

export class Subscription {
  constructor(
    private readonly observers: Set<StateChangeObserver<any>>,
    private readonly observer: StateChangeObserver<any>,
  ) {}
  unsubscribe(): void {
    this.observers.delete(this.observer);
  }
}
