import { act } from '@testing-library/react';
import { getReduxGenericValueHook } from '../testUtils/createReduxWrappers';
import { getInMemoryGenericValueHook } from '../testUtils/createInMemoryWrappers';
import { getLocalStorageGenericValueHook } from '../testUtils/createLocalStorageWrappers';

describe('namespaces consistency', () => {
  const getKey = () => 's.' + Math.random() + '.key';
  const initialList1 = ['1'];
  const initialList2 = ['2'];

  function prepareReduxTest() {
    const key = getKey();
    const { renderGenericHook: r1, store, slice } = getReduxGenericValueHook('nsr1');
    const { renderGenericHook: r2 } = getReduxGenericValueHook('nsr1', store, slice);
    return { key, r1, r2 };
  }

  function prepareInMemoryTest() {
    const key = getKey();
    const { renderGenericHook: r1 } = getInMemoryGenericValueHook('nsm1');
    const { renderGenericHook: r2 } = getInMemoryGenericValueHook('nsm1');
    return { key, r1, r2 };
  }

  function prepareLocalStorageTest() {
    const key = getKey();
    const { renderGenericHook: r1 } = getLocalStorageGenericValueHook('nsl1');
    const { renderGenericHook: r2 } = getLocalStorageGenericValueHook('nsl1');
    return { key, r1, r2 };
  }

  describe.each`
    prepareTest
    ${prepareReduxTest}
    ${prepareInMemoryTest}
    ${prepareLocalStorageTest}
  `(
    'consistency: $prepareTest.name',
    ({ prepareTest }: { prepareTest: typeof prepareReduxTest | typeof prepareInMemoryTest }) => {
      it('should preserve different initial values - exception for consistency', () => {
        // given:
        const { key, r1, r2 } = prepareTest();

        // when:
        const { result: result1 } = r1(key, initialList1);
        const { result: result2 } = r2(key, initialList2);
        // then:
        expect(result1.current[0]).toBe(initialList1);
        expect(result2.current[0]).toBe(initialList2);
      });
      it('should have consistent values when loaded in different order', () => {
        // given:
        const newList1 = ['789'];
        const { key, r1, r2 } = prepareReduxTest();
        // when:
        const { result: result1 } = r1(key, initialList1);
        act(() => result1.current[1](newList1));
        const { result: result2 } = r2(key, initialList2);
        // then:
        expect(result1.current[0]).toBe(newList1);
        expect(result2.current[0]).toBe(newList1);
      });
      it('should have consistent updated values', () => {
        // given:
        const newList1 = ['4'];
        const newList2 = ['8'];
        const { key, r1, r2 } = prepareReduxTest();
        // when:
        const { result: result1 } = r1(key, initialList1);
        const { result: result2 } = r2(key, initialList2);
        // when:
        act(() => result1.current[1](newList1));
        act(() => result2.current[1](newList2));
        // then:
        expect(result1.current[0]).toBe(newList2);
        expect(result2.current[0]).toBe(newList2);
      });
    },
  );
});
