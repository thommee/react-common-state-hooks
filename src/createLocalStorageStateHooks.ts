import { createStateHooks } from './hooks/createStateHooks';
import { createUseGenericStorage } from './storages/genericStorage';
import { LocalStorage } from './storages/localStorage';

export const createLocalStorageStateHooks = (namespace: string) => {
  return createStateHooks(createUseGenericStorage(LocalStorage, namespace));
};
