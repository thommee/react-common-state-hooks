import { getReduxListHook, getReduxRecordHook, getReduxValueHook } from '../testUtils/createReduxWrappers';
import { act } from '@testing-library/react';

describe('create selector', () => {
  describe('getReduxGenericValueHook', () => {
    const { renderGenericHook, store, createSelector } = getReduxValueHook();
    const initialValue = { some: 'value' };
    it('should have initial value', () => {
      const key = 'kv1';
      const selector = createSelector(key, initialValue); // given
      const { result } = renderGenericHook(key, initialValue); // when
      expect(initialValue).toBe(selector(store.getState())); // then
      expect(initialValue).toBe(result.current[0]); // then
    });
    it('should return stored value', () => {
      // given
      const key = 'kv2';
      const selector = createSelector(key, initialValue);
      const { result } = renderGenericHook(key, initialValue);
      const newValue = { other: 'data' };
      expect(initialValue).toBe(selector(store.getState()));
      // when
      act(() => result.current[1](newValue)); // .setValue
      // then
      expect(newValue).toBe(selector(store.getState()));
      expect(newValue).toBe(result.current[0]);
    });
    it('should update stored value', () => {
      // given
      const key = 'kv3';
      const selector = createSelector(key, initialValue);
      const { result } = renderGenericHook(key, initialValue);
      const storedValue = { stored: 'value' };
      const updatedValue = { updated: 'value' };
      expect(initialValue).toBe(selector(store.getState()));
      // when
      act(() => result.current[1](storedValue)); // .setValue
      act(() => result.current[1](updatedValue)); // .setValue
      // then
      expect(updatedValue).toBe(selector(store.getState()));
      expect(updatedValue).toBe(result.current[0]);
    });
  });

  describe('getReduxGenericListHook', () => {
    const { renderGenericHook, store, createSelector } = getReduxListHook();
    const initialValue = [{ some: 'value' }, { second: 'item' }];
    describe('initialValue', () => {
      it('should have initial value', () => {
        const key = 'kv1';
        const selector = createSelector(key, initialValue); // given
        const { result } = renderGenericHook(key, initialValue); // when
        expect(initialValue).toBe(selector(store.getState())); // then
        expect(initialValue).toBe(result.current[0]); // then
      });
    });
    it('.addItem: should return stored value', () => {
      // given
      const key = 'kv2';
      const selector = createSelector(key, initialValue);
      const { result } = renderGenericHook(key, initialValue);
      const newItem = { other: 'data' };
      expect(initialValue).toBe(selector(store.getState()));
      // when
      act(() => result.current[1](newItem)); // .addItem
      // then
      expect(result.current[0]).toBe(selector(store.getState()));
      expect(result.current[0]).toEqual([...initialValue, newItem]);
    });
    it('.removeItem: should return stored value', () => {
      // given
      const key = 'kv3';
      const selector = createSelector(key, initialValue);
      const { result } = renderGenericHook(key, initialValue);
      expect(initialValue).toBe(selector(store.getState()));
      // when
      act(() => result.current[2](initialValue[1])); // .removeItem
      // then
      expect(result.current[0]).toBe(selector(store.getState()));
      expect(result.current[0]).toEqual([initialValue[0]]);
    });
    it('.setList: should return stored value', () => {
      // given
      const key = 'kv4';
      const selector = createSelector(key, initialValue);
      const { result } = renderGenericHook(key, initialValue);
      const newList = [{ nyNem: 'list' }];
      expect(initialValue).toBe(selector(store.getState()));
      // when
      act(() => result.current[3](newList)); // .setList
      // then
      expect(result.current[0]).toBe(selector(store.getState()));
      expect(result.current[0]).not.toBe(newList);
      expect(result.current[0]).toStrictEqual(newList);
    });
  });

  describe('getReduxGenericRecordHook', () => {
    const { renderGenericHook, store, createSelector } = getReduxRecordHook();
    const initialValue = { some: 'value', second: 'item' };
    describe('initialValue', () => {
      it('should have initial value', () => {
        const key = 'kv1';
        const selector = createSelector(key, initialValue); // given
        const { result } = renderGenericHook(key, initialValue); // when
        expect(initialValue).toBe(selector(store.getState())); // then
        expect(initialValue).toBe(result.current[0]); // then
      });
    });
    it('.addItem: should return stored value', () => {
      // given
      const key = 'kv2';
      const selector = createSelector(key, initialValue);
      const { result } = renderGenericHook(key, initialValue);
      const newItem = { key: 'other', value: 'data' };
      expect(initialValue).toBe(selector(store.getState()));
      // when
      act(() => result.current[1](newItem.key, newItem.value)); // .addItem
      // then
      expect(result.current[0]).toBe(selector(store.getState()));
      expect(result.current[0]).toEqual({ ...initialValue, [newItem.key]: newItem.value });
    });
    it('.removeItem: should return stored value', () => {
      // given
      const key = 'kv3';
      const selector = createSelector(key, initialValue);
      const { result } = renderGenericHook(key, initialValue);
      expect(initialValue).toBe(selector(store.getState()));
      // when
      act(() => result.current[2]('second')); // .removeItem
      // then
      expect(result.current[0]).toBe(selector(store.getState()));
      expect(result.current[0]).toEqual({ some: 'value' });
    });
    it('.setRecord: should return stored value', () => {
      // given
      const key = 'kv4';
      const selector = createSelector(key, initialValue);
      const { result } = renderGenericHook(key, initialValue);
      const newRecord = { myNew: 'record' };
      expect(initialValue).toBe(selector(store.getState()));
      // when
      act(() => result.current[3](newRecord)); // .setRecord
      // then
      expect(result.current[0]).toBe(selector(store.getState()));
      expect(result.current[0]).toBe(newRecord);
    });
  });
});
