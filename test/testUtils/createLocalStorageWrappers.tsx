import { createLocalStorageStateHooks } from '../../src';
import { renderHook } from '@testing-library/react';

export function getLocalStorageListHook(namespace = 'localStorage:namespace') {
  const renderGenericHook = (...args: Parameters<ReturnType<typeof createLocalStorageStateHooks>['useList']>) => {
    const { useList } = createLocalStorageStateHooks(namespace);
    return renderHook(() => useList(...args));
  };
  return { renderGenericHook };
}

export function getLocalStorageRecordHook(namespace = 'localStorage:namespace') {
  const renderGenericHook = (...args: Parameters<ReturnType<typeof createLocalStorageStateHooks>['useRecord']>) => {
    const { useRecord } = createLocalStorageStateHooks(namespace);
    return renderHook(() => useRecord(...args));
  };
  return { renderGenericHook };
}

export function getLocalStorageValueHook(namespace = 'localStorage:namespace') {
  const renderGenericHook = (...args: Parameters<ReturnType<typeof createLocalStorageStateHooks>['useValue']>) => {
    const { useValue } = createLocalStorageStateHooks(namespace);
    return renderHook(() => useValue(...args));
  };
  return { renderGenericHook };
}
