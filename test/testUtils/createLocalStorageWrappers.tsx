import { createLocalStorageStateHooks } from '../../src';
import { renderHook } from '@testing-library/react';

export function getLocalStorageGenericListHook(namespace = 'localStorage:namespace') {
  const renderGenericHook = (
    ...args: Parameters<ReturnType<typeof createLocalStorageStateHooks>['useGenericList']>
  ) => {
    const { useGenericList } = createLocalStorageStateHooks(namespace);
    return renderHook(() => useGenericList(...args));
  };
  return { renderGenericHook };
}

export function getLocalStorageGenericRecordHook(namespace = 'localStorage:namespace') {
  const renderGenericHook = (
    ...args: Parameters<ReturnType<typeof createLocalStorageStateHooks>['useGenericRecord']>
  ) => {
    const { useGenericRecord } = createLocalStorageStateHooks(namespace);
    return renderHook(() => useGenericRecord(...args));
  };
  return { renderGenericHook };
}

export function getLocalStorageGenericValueHook(namespace = 'localStorage:namespace') {
  const renderGenericHook = (
    ...args: Parameters<ReturnType<typeof createLocalStorageStateHooks>['useGenericValue']>
  ) => {
    const { useGenericValue } = createLocalStorageStateHooks(namespace);
    return renderHook(() => useGenericValue(...args));
  };
  return { renderGenericHook };
}
