import { act } from '@testing-library/react';
import { getReduxGenericRecordHook } from '../testUtils/createReduxWrappers';
import { getInMemoryGenericRecordHook } from '../testUtils/createInMemoryWrappers';
import { getLocalStorageGenericRecordHook } from '../testUtils/createLocalStorageWrappers';

describe.each`
  renderGenericRecordHook                                       | description
  ${getReduxGenericRecordHook().renderGenericHook}              | ${'redux'}
  ${getInMemoryGenericRecordHook().renderGenericRecordHook}     | ${'inMemory'}
  ${getLocalStorageGenericRecordHook().renderGenericRecordHook} | ${'localStorage'}
`(
  '$description: useGenericRecord',
  ({
    renderGenericRecordHook,
  }: {
    renderGenericRecordHook:
      | ReturnType<typeof getReduxGenericRecordHook>['renderGenericHook']
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
          expect(result.current[0]).toBe(initialValue);
          // when:
          act(() => result.current[1](key, value)); // then:
          expect(result.current[0][key]).toBe(value);
          expect(result.current[0]).toEqual(expectedResult);
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
          expect(result.current[0]).toBe(initialValue);
          // when:
          act(() => result.current[2](keyToRemove)); // then:
          expect(result.current[0]).not.toHaveProperty(keyToRemove);
          expect(result.current[0]).toEqual(expectedResult);
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
          expect(result.current[0]).toBe(initialValue);
          // when:
          act(() => result.current[3](recordToSet)); // then:
          expect(result.current[0]).toBe(recordToSet);
          expect(result.current[0]).toEqual(expectedResult);
        },
      );
    });
    describe('multiple usage', () => {
      it('should return the same records for multiple hook usages', () => {
        // given:
        const key = getKey();
        const initialRecord = { a: '1', b: '2' };
        // when:
        const [record1] = renderGenericRecordHook(key, initialRecord).result.current;
        const [record2] = renderGenericRecordHook(key, initialRecord).result.current;
        // then:
        expect(record1).toBe(record2);
      });

      it('should return the same records when initialized after save', () => {
        // given:
        const key = getKey();
        const initialRecord = { a: '1', b: '2' };
        const itemToAdd = { key: 'c', value: '3' };
        // when:
        const { result: result1 } = renderGenericRecordHook(key, initialRecord);
        act(() => result1.current[1](itemToAdd.key, itemToAdd.value)); // .addItem
        // then:
        const { result: result2 } = renderGenericRecordHook(key, initialRecord);
        expect(result1.current[0]).toBe(result2.current[0]);
        expect(result2.current[0]).toEqual({ ...initialRecord, [itemToAdd.key]: itemToAdd.value });
      });

      it('should addItem to all records when the same key is used multiple times', () => {
        // given:
        const key = getKey();
        const initialRecord = { a: '1', b: '2' };
        const itemToAdd1 = { key: 'c', value: '3' };
        const itemToAdd2 = { key: 'd', value: '4' };
        const { result: result1 } = renderGenericRecordHook(key, initialRecord);
        const { result: result2 } = renderGenericRecordHook(key, initialRecord);

        // when:
        act(() => result1.current[1](itemToAdd1.key, itemToAdd1.value)); // then:
        expect(result1.current[0]).toEqual({ a: '1', b: '2', c: '3' });
        expect(result1.current[0]).toBe(result2.current[0]);

        // when:
        act(() => result2.current[1](itemToAdd2.key, itemToAdd2.value)); // then:
        expect(result2.current[0]).toEqual({ a: '1', b: '2', c: '3', d: '4' });
        expect(result1.current[0]).toBe(result2.current[0]);
      });

      it('should removeItem from all records when the same key is used multiple times', () => {
        // given:
        const key = getKey();
        const initialRecord = { a: '1', b: '2', c: '3', d: '4' };
        const itemToRemove1 = { key: 'c', value: '3' };
        const itemToRemove2 = { key: 'd', value: '4' };
        const { result: result1 } = renderGenericRecordHook(key, initialRecord);
        const { result: result2 } = renderGenericRecordHook(key, initialRecord);

        // when:
        act(() => result1.current[2](itemToRemove1.key)); // then:
        expect(result1.current[0]).toEqual({ a: '1', b: '2', d: '4' });
        expect(result1.current[0]).toBe(result2.current[0]);

        // when:
        act(() => result2.current[2](itemToRemove2.key)); // then:
        expect(result2.current[0]).toEqual({ a: '1', b: '2' });
        expect(result1.current[0]).toBe(result2.current[0]);
      });
    });
  },
);
