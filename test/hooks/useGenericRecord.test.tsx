import { act } from '@testing-library/react';
import { getInMemoryGenericRecordHook, getReduxGenericRecordHook } from './utils/createRecordHooksWrappers';

describe.each`
  renderGenericRecordHook                                   | description
  ${getReduxGenericRecordHook().renderGenericRecordHook}    | ${'redux'}
  ${getInMemoryGenericRecordHook().renderGenericRecordHook} | ${'inMemory'}
`(
  '$description: useGenericRecord',
  ({
    renderGenericRecordHook,
  }: {
    renderGenericRecordHook:
      | ReturnType<typeof getReduxGenericRecordHook>['renderGenericRecordHook']
      | ReturnType<typeof getInMemoryGenericRecordHook>['renderGenericRecordHook'];
  }) => {
    const getKey = () => 's.' + Math.random() + '.key';

    describe('.addItem', () => {
      it.each`
        initialValue  | itemToAdd                         | expectedResult
        ${{}}         | ${{ key: 'k', value: 'v' }}       | ${{ k: 'v' }}
        ${{ k: 'a' }} | ${{ key: 'k', value: 'v' }}       | ${{ k: 'v' }}
        ${{ k: 'v' }} | ${{ key: 'k', value: 'v' }}       | ${{ k: 'v' }}
        ${{ k: 'a' }} | ${{ key: 'k', value: undefined }} | ${{ k: undefined }}
      `(
        'should update value from "$initialValue" with "$itemToAdd"',
        ({ initialValue, itemToAdd: { key, value }, expectedResult }) => {
          // given:
          const { result } = renderGenericRecordHook(getKey(), initialValue);
          const { record, addItem } = result.current;
          expect(record).toBe(initialValue);
          // when:
          act(() => addItem(key, value)); // then:
          expect(result.current.record[key]).toBe(value);
          expect(result.current.record).toEqual(expectedResult);
        },
      );
    });
    describe('.removeItem', () => {
      it.each`
        initialValue  | keyToRemove | expectedResult
        ${{}}         | ${'k'}      | ${{}}
        ${{ a: 'a' }} | ${'k'}      | ${{ a: 'a' }}
        ${{ k: 'v' }} | ${'k'}      | ${{}}
      `(
        'should remove value from "$initialValue" with "$itemToRemove"',
        ({ initialValue, keyToRemove, expectedResult }) => {
          // given:
          const { result } = renderGenericRecordHook(getKey(), initialValue);
          const { record, removeItem } = result.current;
          expect(record).toBe(initialValue);
          // when:
          act(() => removeItem(keyToRemove)); // then:
          expect(result.current.record).not.toHaveProperty(keyToRemove);
          expect(result.current.record).toEqual(expectedResult);
        },
      );
    });
    describe('.setRecord', () => {
      it.each`
        initialValue  | recordToSet   | expectedResult
        ${{}}         | ${{}}         | ${{}}
        ${{ a: 'a' }} | ${{ a: 'a' }} | ${{ a: 'a' }}
        ${{ k: 'v' }} | ${{ a: 'a' }} | ${{ a: 'a' }}
      `(
        'should set record from "$initialValue" with "$recordToSet"',
        ({ initialValue, recordToSet, expectedResult }) => {
          // given:
          const { result } = renderGenericRecordHook(getKey(), initialValue);
          const { record, setRecord } = result.current;
          expect(record).toBe(initialValue);
          // when:
          act(() => setRecord(recordToSet)); // then:
          expect(result.current.record).toBe(recordToSet);
          expect(result.current.record).toEqual(expectedResult);
        },
      );
    });
  },
);
