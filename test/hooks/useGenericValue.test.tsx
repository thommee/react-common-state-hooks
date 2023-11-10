import { act } from '@testing-library/react';
import { getInMemoryGenericValueHook, getReduxGenericValueHook } from './utils/createHooksWrappers';

describe.each`
  renderGenericValueHook                                  | description
  ${getReduxGenericValueHook().renderGenericValueHook}    | ${'redux'}
  ${getInMemoryGenericValueHook().renderGenericValueHook} | ${'inMemory'}
`('$description: useGenericValue', ({ renderGenericValueHook }) => {
  it('should update value', () => {
    // given:
    const initialValue1 = '1';
    const initialValue2 = '2';
    const key1 = 'testKey1';
    const key2 = 'testKey2';
    const { result: result1 } = renderGenericValueHook(key1, initialValue1);
    const { result: result2 } = renderGenericValueHook(key2, initialValue2);

    const [value1, setValue1] = result1.current;
    expect(value1).toBe(initialValue1);
    const [value2, setValue2] = result2.current;
    expect(value2).toBe(initialValue2);

    // when:
    act(() => setValue1('1_1')); // then:
    expect(result1.current[0]).toBe('1_1');
    // when:
    act(() => setValue2('2_2')); // then:
    expect(result2.current[0]).toBe('2_2');
    // when:
    act(() => setValue1('1_2')); // then:
    expect(result1.current[0]).toBe('1_2');
  });

  it('should use initialValue only at start', () => {
    // given:
    const key = 'key';
    const initialValue = 'initial';
    const { result } = renderGenericValueHook(key, initialValue);
    const [value, setValue] = result.current;
    expect(value).toBe(initialValue);
    // when:
    act(() => setValue('newValue')); // then:
    expect(result.current[0]).toBe('newValue');
    // when:
    act(() => setValue(undefined));
    expect(result.current[0]).toBe(undefined);
  });
});
