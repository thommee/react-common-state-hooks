import { createUseLocalStorage } from './storages/localStorage';
import { createStateHooks } from './hooks/createStateHooks';

export const createLocalStorageStateHooks = (namespace: string) => {
  return createStateHooks(createUseLocalStorage(namespace));
};
