import { createReduxStateHooks } from '../../src';
import { combineReducers, createStore } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react';

export function getReduxGenericListHook() {
  const namespace = 'redux:namespace';
  const { useGenericList, slice, createSelector } = createReduxStateHooks(namespace);
  const store = createStore(combineReducers({ [slice.name]: slice.reducer }));
  const Wrapper = ({ children }: React.PropsWithChildren) => <Provider store={store}>{children}</Provider>;

  const renderGenericListHook = (...args: Parameters<ReturnType<typeof createReduxStateHooks>['useGenericList']>) => {
    return renderHook(() => useGenericList(...args), { wrapper: Wrapper });
  };
  return { useGenericList, Wrapper, renderGenericListHook, store, createSelector };
}

export function getReduxGenericRecordHook() {
  const namespace = 'redux:namespace';
  const { useGenericRecord, slice, createSelector } = createReduxStateHooks(namespace);
  const store = createStore(combineReducers({ [slice.name]: slice.reducer }));
  const Wrapper = ({ children }: React.PropsWithChildren) => <Provider store={store}>{children}</Provider>;

  const renderGenericRecordHook = (
    ...args: Parameters<ReturnType<typeof createReduxStateHooks>['useGenericRecord']>
  ) => {
    return renderHook(() => useGenericRecord(...args), { wrapper: Wrapper });
  };
  return { useGenericRecord, Wrapper, renderGenericRecordHook, store, createSelector };
}

export function getReduxGenericValueHook() {
  const namespace = 'redux:namespace';
  const { useGenericValue, slice, createSelector } = createReduxStateHooks(namespace);
  const store = createStore(combineReducers({ [slice.name]: slice.reducer }));
  const Wrapper = ({ children }: React.PropsWithChildren) => <Provider store={store}>{children}</Provider>;

  const renderGenericValueHook = (...args: Parameters<ReturnType<typeof createReduxStateHooks>['useGenericValue']>) => {
    return renderHook(() => useGenericValue(...args), { wrapper: Wrapper });
  };
  return { useGenericValue, Wrapper, renderGenericValueHook, store, createSelector };
}
