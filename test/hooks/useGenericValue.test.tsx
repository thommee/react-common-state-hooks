import { act } from '@testing-library/react';
import { getReduxGenericValueHook } from '../testUtils/createReduxWrappers';
import { getInMemoryGenericValueHook } from '../testUtils/createInMemoryWrappers';

describe.each`
  renderGenericValueHook                                  | description
  ${getReduxGenericValueHook().renderGenericValueHook}    | ${'redux'}
  ${getInMemoryGenericValueHook().renderGenericValueHook} | ${'inMemory'}
`(
  '$description: useGenericValue',
  ({
    renderGenericValueHook,
  }: {
    renderGenericValueHook:
      | ReturnType<typeof getReduxGenericValueHook>['renderGenericValueHook']
      | ReturnType<typeof getInMemoryGenericValueHook>['renderGenericValueHook'];
  }) => {
    it('should update value', () => {
      // given:
      const initialValue1 = '1';
      const initialValue2 = '2';
      const key1 = 'testKey1';
      const key2 = 'testKey2';
      const { result: result1 } = renderGenericValueHook(key1, initialValue1);
      const { result: result2 } = renderGenericValueHook(key2, initialValue2);

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
      const { result } = renderGenericValueHook(key, initialValue);
      expect(result.current[0]).toBe(initialValue);
      // when:
      act(() => result.current[1]('newValue')); // then:
      expect(result.current[0]).toBe('newValue');
      // when:
      act(() => result.current[1](undefined));
      expect(result.current[0]).toBe(undefined);
    });
  },
);
