import { LocalStorageStorage } from './LocalStorageStorage';
import { createUseGenericStorage } from '../genericStorage/createUseGenericStorage';

export const createUseLocalStorage = (namespace: string) => {
  return createUseGenericStorage(LocalStorageStorage, namespace);
};
