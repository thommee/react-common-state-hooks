import { createInMemoryStateHooks } from '../../src';
import { renderHook } from '@testing-library/react';

export function getInMemoryGenericListHook(namespace = 'inMemory:namespace') {
  const renderGenericListHook = (
    ...args: Parameters<ReturnType<typeof createInMemoryStateHooks>['useGenericList']>
  ) => {
    const { useGenericList } = createInMemoryStateHooks(namespace);
    return renderHook(() => useGenericList(...args));
  };
  return { renderGenericListHook };
}

export function getInMemoryGenericRecordHook(namespace = 'inMemory:namespace') {
  const renderGenericRecordHook = (
    ...args: Parameters<ReturnType<typeof createInMemoryStateHooks>['useGenericRecord']>
  ) => {
    const { useGenericRecord } = createInMemoryStateHooks(namespace);
    return renderHook(() => useGenericRecord(...args));
  };
  return { renderGenericRecordHook };
}

export function getInMemoryGenericValueHook(namespace = 'inMemory:namespace') {
  const renderGenericValueHook = (
    ...args: Parameters<ReturnType<typeof createInMemoryStateHooks>['useGenericValue']>
  ) => {
    const { useGenericValue } = createInMemoryStateHooks(namespace);
    return renderHook(() => useGenericValue(...args));
  };
  return { renderGenericValueHook };
}
