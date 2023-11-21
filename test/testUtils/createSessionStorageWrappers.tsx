import { createSessionStorageStateHooks } from '../../src';
import { renderHook } from '@testing-library/react';

export function getSessionStorageListHook(namespace = 'sessionStorage:namespace') {
  const renderGenericHook = (...args: Parameters<ReturnType<typeof createSessionStorageStateHooks>['useList']>) => {
    const { useList } = createSessionStorageStateHooks(namespace);
    return renderHook(() => useList(...args));
  };
  return { renderGenericHook };
}

export function getSessionStorageRecordHook(namespace = 'sessionStorage:namespace') {
  const renderGenericHook = (...args: Parameters<ReturnType<typeof createSessionStorageStateHooks>['useRecord']>) => {
    const { useRecord } = createSessionStorageStateHooks(namespace);
    return renderHook(() => useRecord(...args));
  };
  return { renderGenericHook };
}

export function getSessionStorageValueHook(namespace = 'sessionStorage:namespace') {
  const renderGenericHook = (...args: Parameters<ReturnType<typeof createSessionStorageStateHooks>['useValue']>) => {
    const { useValue } = createSessionStorageStateHooks(namespace);
    return renderHook(() => useValue(...args));
  };
  return { renderGenericHook };
}
