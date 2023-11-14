import { createReduxStorage } from './storages/redux';
import { createStateHooks } from './hooks/createStateHooks';

export const createReduxStateHooks = (namespace: string) => {
  return createStateHooks(createReduxStorage(namespace));
};
