import { createReduxStateHooks } from '../../src';
import { combineReducers, createStore } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react';
import * as Redux from 'redux';

export function getReduxListHook(namespace = 'redux:namespace') {
  const { useList, slice, createSelector, createAction } = createReduxStateHooks(namespace);
  const store = createStore(combineReducers({ [slice.name]: slice.reducer }));
  const Wrapper = ({ children }: React.PropsWithChildren) => <Provider store={store}>{children}</Provider>;

  const renderGenericHook = (...args: Parameters<ReturnType<typeof createReduxStateHooks>['useList']>) => {
    return renderHook(() => useList(...args), { wrapper: Wrapper });
  };
  return { useList, Wrapper, renderGenericHook, store, createSelector, createAction };
}

export function getReduxRecordHook(namespace = 'redux:namespace') {
  const { useRecord, slice, createSelector, createAction } = createReduxStateHooks(namespace);
  const store = createStore(combineReducers({ [slice.name]: slice.reducer }));
  const Wrapper = ({ children }: React.PropsWithChildren) => <Provider store={store}>{children}</Provider>;

  const renderGenericHook = (...args: Parameters<ReturnType<typeof createReduxStateHooks>['useRecord']>) => {
    return renderHook(() => useRecord(...args), { wrapper: Wrapper });
  };
  return { useRecord, Wrapper, renderGenericHook, store, createSelector, createAction };
}

export function getReduxValueHook(
  namespace = 'redux:namespace',
  store0?: Redux.Store,
  slice0?: ReturnType<typeof createReduxStateHooks>['slice'],
) {
  const { useValue, slice, createSelector, createAction } = createReduxStateHooks(namespace);
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

  const renderGenericHook = (...args: Parameters<ReturnType<typeof createReduxStateHooks>['useValue']>) => {
    return renderHook(() => useValue(...args), { wrapper: Wrapper });
  };
  return { useValue, Wrapper, renderGenericHook, store, createSelector, createAction, slice };
}
