import { renderHook } from '@testing-library/react';

import { combineReducers, createStore } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import { createInMemoryStateHooks, createReduxStateHooks } from '../../../src';

export function getReduxGenericRecordHook() {
  const namespace = 'redux:namespace';
  const { useGenericRecord, slice } = createReduxStateHooks(namespace);
  const store = createStore(combineReducers({ [slice.name]: slice.reducer }));
  const Wrapper = ({ children }: React.PropsWithChildren) => <Provider store={store}>{children}</Provider>;

  const renderGenericRecordHook = (
    ...args: Parameters<ReturnType<typeof createReduxStateHooks>['useGenericRecord']>
  ) => {
    return renderHook(() => useGenericRecord(...args), { wrapper: Wrapper });
  };
  return { useGenericRecord, Wrapper, renderGenericRecordHook };
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
