export interface StateChangeObserver {
  (value: any): void;
}

export class Subscription {
  constructor(
    private readonly observers: Set<StateChangeObserver>,
    private readonly observer: StateChangeObserver,
  ) {}
  unsubscribe(): void {
    this.observers.delete(this.observer);
  }
}
