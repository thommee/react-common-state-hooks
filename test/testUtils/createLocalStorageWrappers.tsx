import { createLocalStorageStateHooks } from '../../src';
import { renderHook } from '@testing-library/react';

export function getLocalStorageGenericListHook() {
  const renderGenericListHook = (
    ...args: Parameters<ReturnType<typeof createLocalStorageStateHooks>['useGenericList']>
  ) => {
    const { useGenericList } = createLocalStorageStateHooks('localStorage:namespace');
    return renderHook(() => useGenericList(...args));
  };
  return { renderGenericListHook };
}

export function getLocalStorageGenericRecordHook() {
  const renderGenericRecordHook = (
    ...args: Parameters<ReturnType<typeof createLocalStorageStateHooks>['useGenericRecord']>
  ) => {
    const { useGenericRecord } = createLocalStorageStateHooks('localStorage:namespace');
    return renderHook(() => useGenericRecord(...args));
  };
  return { renderGenericRecordHook };
}

export function getLocalStorageGenericValueHook() {
  const renderGenericValueHook = (
    ...args: Parameters<ReturnType<typeof createLocalStorageStateHooks>['useGenericValue']>
  ) => {
    const { useGenericValue } = createLocalStorageStateHooks('localStorage:namespace');
    return renderHook(() => useGenericValue(...args));
  };
  return { renderGenericValueHook };
}
