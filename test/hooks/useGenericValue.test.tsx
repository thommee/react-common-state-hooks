import { act } from '@testing-library/react';
import { getReduxValueHook } from '../testUtils/createReduxWrappers';
import { getInMemoryValueHook } from '../testUtils/createInMemoryWrappers';
import { getLocalStorageValueHook } from '../testUtils/createLocalStorageWrappers';
import { getSessionStorageValueHook } from '../testUtils/createSessionStorageWrappers';

describe.each`
  renderValueHook                                   | description
  ${getReduxValueHook().renderGenericHook}          | ${'redux'}
  ${getInMemoryValueHook().renderGenericHook}       | ${'inMemory'}
  ${getLocalStorageValueHook().renderGenericHook}   | ${'localStorage'}
  ${getSessionStorageValueHook().renderGenericHook} | ${'sessionStorage'}
`(
  '$description: useValue',
  ({
    renderValueHook,
  }: {
    renderValueHook:
      | ReturnType<typeof getReduxValueHook>['renderGenericHook']
      | ReturnType<typeof getInMemoryValueHook>['renderGenericHook'];
  }) => {
    const getKey = () => 's.' + Math.random() + '.key';

    describe('general usage', () => {
      it('should update value', () => {
        // given:
        const initialValue1 = '1';
        const initialValue2 = '2';
        const key1 = 'testKey1';
        const key2 = 'testKey2';
        const { result: result1 } = renderValueHook(key1, initialValue1);
        const { result: result2 } = renderValueHook(key2, initialValue2);

        expect(result1.current[0]).toBe(initialValue1);
        expect(result2.current[0]).toBe(initialValue2);

        // when:
        act(() => result1.current[1]('1_1')); // then:
        expect(result1.current[0]).toBe('1_1');
        // when:
        act(() => result2.current[1]('2_2')); // then:
        expect(result2.current[0]).toBe('2_2');
        // when:
        act(() => result1.current[1]('1_2')); // then:
        expect(result1.current[0]).toBe('1_2');
      });
      it('should use initialValue only at start', () => {
        // given:
        const key = 'key';
        const initialValue = 'initial';
        const { result } = renderValueHook(key, initialValue);
        expect(result.current[0]).toBe(initialValue);
        // when:
        act(() => result.current[1]('newValue')); // then:
        expect(result.current[0]).toBe('newValue');
        // when:
        act(() => result.current[1](undefined));
        expect(result.current[0]).toBe(undefined);
      });
    });
    describe('multiple usage', () => {
      it('should return the same lists for multiple hook usages', () => {
        // given:
        const key = getKey();
        const initialValue = { some: 'value' };
        // when:
        const [value1] = renderValueHook(key, initialValue).result.current;
        const [value2] = renderValueHook(key, initialValue).result.current;
        // then:
        expect(value1).toBe(value2);
        expect(value1).toBe(initialValue);
      });

      it('should return the same lists when initialized after save', () => {
        // given:
        const key = getKey();
        const initialValue = { a: '1', b: '2' };
        const newValue = { key: 'c', value: '3' };
        // when:
        const { result: result1 } = renderValueHook(key, initialValue);
        act(() => result1.current[1](newValue)); // .saveValue
        // then:
        const { result: result2 } = renderValueHook(key, initialValue);
        expect(result1.current[0]).toBe(result2.current[0]);
        expect(result2.current[0]).toBe(newValue);
      });
    });
  },
);
