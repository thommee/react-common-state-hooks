import { StateChangeObserver, StateChangeSubscription } from '../../../types';

export class BaseStateChangeSubscription implements StateChangeSubscription {
  constructor(
    private readonly observers: Set<StateChangeObserver<any>>,
    private readonly observer: StateChangeObserver<any>,
  ) {}
  unsubscribe(): void {
    this.observers.delete(this.observer);
  }
}
