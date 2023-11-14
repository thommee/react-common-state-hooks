import { InMemoryStorage } from './InMemoryStorage';
import { createUseGenericStorage } from '../genericStorage/createUseGenericStorage';

export const createUseInMemoryStorage = (namespace: string) => {
  return createUseGenericStorage(InMemoryStorage, namespace);
};
