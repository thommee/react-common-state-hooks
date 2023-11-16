import { createInMemoryStateHooks } from '../../src';
import { renderHook } from '@testing-library/react';

export function getInMemoryGenericListHook(namespace = 'inMemory:namespace') {
  const renderGenericHook = (...args: Parameters<ReturnType<typeof createInMemoryStateHooks>['useGenericList']>) => {
    const { useGenericList } = createInMemoryStateHooks(namespace);
    return renderHook(() => useGenericList(...args));
  };
  return { renderGenericHook };
}

export function getInMemoryGenericRecordHook(namespace = 'inMemory:namespace') {
  const renderGenericHook = (...args: Parameters<ReturnType<typeof createInMemoryStateHooks>['useGenericRecord']>) => {
    const { useGenericRecord } = createInMemoryStateHooks(namespace);
    return renderHook(() => useGenericRecord(...args));
  };
  return { renderGenericHook };
}

export function getInMemoryGenericValueHook(namespace = 'inMemory:namespace') {
  const renderGenericHook = (...args: Parameters<ReturnType<typeof createInMemoryStateHooks>['useGenericValue']>) => {
    const { useGenericValue } = createInMemoryStateHooks(namespace);
    return renderHook(() => useGenericValue(...args));
  };
  return { renderGenericHook };
}
