import { createStateHooks } from './hooks/createStateHooks';
import { createUseGenericStorage } from './storages/genericStorage';
import { SessionStorage } from './storages/sessionStorage';

export const createSessionStorageStateHooks = (namespace: string) => {
  return createStateHooks(createUseGenericStorage(SessionStorage, namespace));
};
