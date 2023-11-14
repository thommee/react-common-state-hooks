import { createStateHooks } from './hooks/createStateHooks';
import { createUseGenericStorage } from './storages/genericStorage';
import { InMemoryStorage } from './storages/inMemory';

export const createInMemoryStateHooks = (namespace: string) => {
  return createStateHooks(createUseGenericStorage(InMemoryStorage, namespace));
};
