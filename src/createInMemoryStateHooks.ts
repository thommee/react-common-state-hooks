import { createUseInMemoryStorage } from './storages/inMemory';
import { createStateHooks } from './hooks/createStateHooks';

export const createInMemoryStateHooks = (namespace: string) => {
  return createStateHooks(createUseInMemoryStorage(namespace));
};
