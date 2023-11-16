import {
  getReduxGenericListHook,
  getReduxGenericRecordHook,
  getReduxGenericValueHook,
} from '../testUtils/createReduxWrappers';
import { act } from '@testing-library/react';

describe('create action', () => {
  describe.each`
    getHook                      | initialValue       | setValue           | updatedValue
    ${getReduxGenericListHook}   | ${['1']}           | ${['2']}           | ${['3']}
    ${getReduxGenericRecordHook} | ${{ a: 'redux1' }} | ${{ b: 'redux2' }} | ${{ c: 'redux3' }}
    ${getReduxGenericValueHook}  | ${'r1'}            | ${'r2'}            | ${'r3'}
  `('$getHook.name', ({ getHook, initialValue, setValue, updatedValue }) => {
    const { renderGenericHook, store, createAction, createSelector } = getHook();

    function prepareTest(key: string) {
      const selector = createSelector(key, initialValue);
      const setValueAction = createAction(key);
      const { result } = renderGenericHook(key, initialValue);
      expect(initialValue).toBe(selector(store.getState()));
      expect(initialValue).toBe(result.current[0]);
      return { selector, setValueAction, result };
    }

    it('should return stored value', () => {
      // given
      const key = 'kv2';
      const { selector, setValueAction, result } = prepareTest(key);
      // when
      act(() => store.dispatch(setValueAction(setValue)));
      // then
      expect(setValue).toBe(selector(store.getState()));
      expect(setValue).toBe(result.current[0]);
    });
    it('should update stored value', () => {
      // given
      const key = 'kv3';
      const { selector, setValueAction, result } = prepareTest(key);
      // when
      act(() => store.dispatch(setValueAction(setValue)));
      act(() => store.dispatch(setValueAction(updatedValue)));
      // then
      expect(updatedValue).toBe(selector(store.getState()));
      expect(updatedValue).toBe(result.current[0]);
    });
  });
});
