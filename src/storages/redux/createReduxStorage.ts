import { createReducerSlice } from './createReducerSlice';
import { UseStorageApi } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';

export const createReduxStorage = (namespace: string) => {
  const { reducer, name, createAction, createSelector } = createReducerSlice(namespace);

  const useStorage = <T>(key: string, initialValue: T): UseStorageApi<T> => {
    const dispatch = useDispatch();
    const action = useMemo(() => createAction<T>(key), [key]);
    const selector = useMemo(() => createSelector<T>(key, initialValue), [initialValue, key]);
    const value = useSelector<unknown, T>(selector);

    const setValue = useCallback((payload: T) => dispatch(action(payload)), [action, dispatch]);

    return useMemo(() => [value, setValue], [setValue, value]);
  };

  return {
    slice: { name, reducer },
    useStorage,
    createSelector,
  };
};
