import { createInMemoryStateHooks } from '../../../src';
import { renderHook } from '@testing-library/react';

export function getInMemoryGenericListHook() {
  const renderGenericListHook = (
    ...args: Parameters<ReturnType<typeof createInMemoryStateHooks>['useGenericList']>
  ) => {
    const { useGenericList } = createInMemoryStateHooks();
    return renderHook(() => useGenericList(...args));
  };
  return { renderGenericListHook };
}

export function getInMemoryGenericRecordHook() {
  const renderGenericRecordHook = (
    ...args: Parameters<ReturnType<typeof createInMemoryStateHooks>['useGenericRecord']>
  ) => {
    const { useGenericRecord } = createInMemoryStateHooks();
    return renderHook(() => useGenericRecord(...args));
  };
  return { renderGenericRecordHook };
}

export function getInMemoryGenericValueHook() {
  const renderGenericValueHook = (
    ...args: Parameters<ReturnType<typeof createInMemoryStateHooks>['useGenericValue']>
  ) => {
    const { useGenericValue } = createInMemoryStateHooks();
    return renderHook(() => useGenericValue(...args));
  };
  return { renderGenericValueHook };
}
