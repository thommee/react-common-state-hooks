import { createInMemoryStateHooks } from '../../src';
import { renderHook } from '@testing-library/react';

export function getInMemoryListHook(namespace = 'inMemory:namespace') {
  const renderGenericHook = (...args: Parameters<ReturnType<typeof createInMemoryStateHooks>['useList']>) => {
    const { useList } = createInMemoryStateHooks(namespace);
    return renderHook(() => useList(...args));
  };
  return { renderGenericHook };
}

export function getInMemoryRecordHook(namespace = 'inMemory:namespace') {
  const renderGenericHook = (...args: Parameters<ReturnType<typeof createInMemoryStateHooks>['useRecord']>) => {
    const { useRecord } = createInMemoryStateHooks(namespace);
    return renderHook(() => useRecord(...args));
  };
  return { renderGenericHook };
}

export function getInMemoryValueHook(namespace = 'inMemory:namespace') {
  const renderGenericHook = (...args: Parameters<ReturnType<typeof createInMemoryStateHooks>['useValue']>) => {
    const { useValue } = createInMemoryStateHooks(namespace);
    return renderHook(() => useValue(...args));
  };
  return { renderGenericHook };
}
