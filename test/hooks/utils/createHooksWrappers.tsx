import { renderHook } from '@testing-library/react';

import { combineReducers, createStore } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import { createInMemoryStateHooks, createReduxStateHooks } from '../../../src';

export function getReduxGenericListHook() {
  const namespace = 'redux:namespace';
  const { useGenericList, slice } = createReduxStateHooks(namespace);
  const store = createStore(combineReducers({ [slice.name]: slice.reducer }));
  const Wrapper = ({ children }: React.PropsWithChildren) => <Provider store={store}>{children}</Provider>;

  const renderGenericListHook = (...args: Parameters<ReturnType<typeof createReduxStateHooks>['useGenericList']>) => {
    return renderHook(() => useGenericList(...args), { wrapper: Wrapper });
  };
  return { useGenericList, Wrapper, renderGenericListHook };
}

export function getInMemoryGenericListHook() {
  const renderGenericListHook = (
    ...args: Parameters<ReturnType<typeof createInMemoryStateHooks>['useGenericList']>
  ) => {
    const { useGenericList } = createInMemoryStateHooks();
    return renderHook(() => useGenericList(...args));
  };
  return { renderGenericListHook };
}

export function getReduxGenericValueHook() {
  const namespace = 'redux:namespace';
  const { useGenericValue, slice } = createReduxStateHooks(namespace);
  const store = createStore(combineReducers({ [slice.name]: slice.reducer }));
  const Wrapper = ({ children }: React.PropsWithChildren) => <Provider store={store}>{children}</Provider>;

  const renderGenericValueHook = (...args: Parameters<ReturnType<typeof createReduxStateHooks>['useGenericValue']>) => {
    return renderHook(() => useGenericValue(...args), { wrapper: Wrapper });
  };
  return { useGenericValue, Wrapper, renderGenericValueHook };
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
