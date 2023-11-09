import { act, renderHook } from '@testing-library/react';
import { createInMemoryStateHooks } from '../src';

describe('useGenericValue', () => {
  const { useGenericValue } = createInMemoryStateHooks();
  const key1 = 'testKey1';
  const initialValue1 = '1';

  const key2 = 'testKey2';
  const initialValue2 = '2';

  it('should update value', () => {
    const { result: result1 } = renderHook(() => useGenericValue(key1, initialValue1));
    const { result: result2 } = renderHook(() => useGenericValue(key2, initialValue2));

    const [value1, setValue1] = result1.current;
    expect(value1).toBe(initialValue1);

    const [value2, setValue2] = result2.current;
    expect(value2).toBe(initialValue2);

    act(() => setValue1('1_1'));
    expect(result1.current[0]).toBe('1_1');

    act(() => setValue2('2_2'));
    expect(result2.current[0]).toBe('2_2');

    act(() => setValue1('1_2'));
    expect(result1.current[0]).toBe('1_2');
  });
});
