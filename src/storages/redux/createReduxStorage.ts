import { createReducerSlice } from './createReducerSlice';
import { UseStorageApi } from '../UseStorage';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useRef } from 'react';

export const createReduxStorage = (namespace: string) => {
  const { reducer, name, createAction, createSelector } = createReducerSlice(namespace);

  const useStorage = <T>(key: string, initialValue: T): UseStorageApi<T> => {
    const dispatch = useDispatch();
    const action = useMemo(() => createAction<T>(key), [key]);
    const selector = useMemo(() => createSelector<T>(key, initialValue), [initialValue, key]);
    const value = useSelector<unknown, T>(selector);
    const refValue = useRef(value);

    useEffect(() => {
      refValue.current = value;
    }, [value]);

    const setValue = useCallback<UseStorageApi<T>[1]>((payload) => {
      const newValue = ( payload instanceof Function) ? payload(refValue.current) : payload;
      dispatch(action(newValue));
    }, [action, dispatch, refValue]);

    return useMemo(() => [value, setValue], [setValue, value]);
  };

  return {
    slice: { name, reducer },
    useStorage,
    createSelector,
  };
};
