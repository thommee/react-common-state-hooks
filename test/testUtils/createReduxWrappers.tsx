import { createReduxStateHooks } from '../../src';
import { combineReducers, createStore } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react';
import * as Redux from 'redux';

export function getReduxGenericListHook(namespace = 'redux:namespace') {
  const { useGenericList, slice, createSelector, createAction } = createReduxStateHooks(namespace);
  const store = createStore(combineReducers({ [slice.name]: slice.reducer }));
  const Wrapper = ({ children }: React.PropsWithChildren) => <Provider store={store}>{children}</Provider>;

  const renderGenericHook = (...args: Parameters<ReturnType<typeof createReduxStateHooks>['useGenericList']>) => {
    return renderHook(() => useGenericList(...args), { wrapper: Wrapper });
  };
  return { useGenericList, Wrapper, renderGenericHook, store, createSelector, createAction };
}

export function getReduxGenericRecordHook(namespace = 'redux:namespace') {
  const { useGenericRecord, slice, createSelector, createAction } = createReduxStateHooks(namespace);
  const store = createStore(combineReducers({ [slice.name]: slice.reducer }));
  const Wrapper = ({ children }: React.PropsWithChildren) => <Provider store={store}>{children}</Provider>;

  const renderGenericHook = (...args: Parameters<ReturnType<typeof createReduxStateHooks>['useGenericRecord']>) => {
    return renderHook(() => useGenericRecord(...args), { wrapper: Wrapper });
  };
  return { useGenericRecord, Wrapper, renderGenericHook, store, createSelector, createAction };
}

export function getReduxGenericValueHook(
  namespace = 'redux:namespace',
  store0?: Redux.Store,
  slice0?: ReturnType<typeof createReduxStateHooks>['slice'],
) {
  const { useGenericValue, slice, createSelector, createAction } = createReduxStateHooks(namespace);
  const store = store0 ?? createStore(combineReducers({ [slice.name]: slice.reducer }));
  if (slice0) {
    store.replaceReducer(
      combineReducers({
        [slice.name]: slice.reducer,
        [slice0.name]: slice0.reducer,
      }),
    );
  }

  const Wrapper = ({ children }: React.PropsWithChildren) => <Provider store={store}>{children}</Provider>;

  const renderGenericHook = (...args: Parameters<ReturnType<typeof createReduxStateHooks>['useGenericValue']>) => {
    return renderHook(() => useGenericValue(...args), { wrapper: Wrapper });
  };
  return { useGenericValue, Wrapper, renderGenericHook, store, createSelector, createAction, slice };
}
