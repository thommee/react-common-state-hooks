import { act } from '@testing-library/react';
import { getReduxGenericValueHook } from '../testUtils/createReduxWrappers';
import { getInMemoryGenericValueHook } from '../testUtils/createInMemoryWrappers';
import { getLocalStorageGenericValueHook } from '../testUtils/createLocalStorageWrappers';

describe('namespaces', () => {
  const getKey = () => 's.' + Math.random() + '.key';

  describe.each`
    renderGenericValueHook1                                      | renderGenericValueHook2                                      | description
    ${getReduxGenericValueHook('nsa1').renderGenericHook}        | ${getReduxGenericValueHook('nsa2').renderGenericHook}        | ${'redux'}
    ${getInMemoryGenericValueHook('nsb1').renderGenericHook}     | ${getInMemoryGenericValueHook('nsb2').renderGenericHook}     | ${'inMemory'}
    ${getLocalStorageGenericValueHook('nsc1').renderGenericHook} | ${getLocalStorageGenericValueHook('nsc2').renderGenericHook} | ${'localStorage'}
  `(
    'separation: $description',
    ({
      renderGenericValueHook1,
      renderGenericValueHook2,
    }: {
      renderGenericValueHook1:
        | ReturnType<typeof getReduxGenericValueHook>['renderGenericHook']
        | ReturnType<typeof getInMemoryGenericValueHook>['renderGenericHook']
        | ReturnType<typeof getLocalStorageGenericValueHook>['renderGenericHook'];
      renderGenericValueHook2:
        | ReturnType<typeof getReduxGenericValueHook>['renderGenericHook']
        | ReturnType<typeof getInMemoryGenericValueHook>['renderGenericHook']
        | ReturnType<typeof getLocalStorageGenericValueHook>['renderGenericHook'];
    }) => {
      it('should have stable value', () => {
        // given:
        const key = getKey();
        const initialList1 = ['1'];
        const initialList2 = ['2'];
        // when:
        const { result: result1 } = renderGenericValueHook1(key, initialList1);
        const { result: result2 } = renderGenericValueHook2(key, initialList2);
        // then:
        expect(result1.current[0]).toBe(initialList1);
        expect(result2.current[0]).toBe(initialList2);
      });
      it('should have stable value when loaded in different order', () => {
        // given:
        const key = getKey();
        const initialList1 = ['1', '2', '3'];
        const initialList2 = ['4', '5', '6'];
        // when:
        const { result: result1 } = renderGenericValueHook1(key, initialList1);
        const { result: result2 } = renderGenericValueHook2(key, initialList2);
        // then:
        expect(result1.current[0]).toBe(initialList1);
        expect(result2.current[0]).toBe(initialList2);
      });
      it('should have stable updated modifier', () => {
        // given:
        const key = getKey();
        const initialList1 = ['1', '2', '3'];
        const initialList2 = ['4', '5', '6'];
        const newList1 = ['4'];
        const newList2 = ['8'];
        // when:
        const { result: result1 } = renderGenericValueHook1(key, initialList1);
        const { result: result2 } = renderGenericValueHook2(key, initialList2);
        // when:
        act(() => result1.current[1](newList1));
        act(() => result2.current[1](newList2));
        // then:
        expect(result1.current[0]).toBe(newList1);
        expect(result2.current[0]).toBe(newList2);
      });
    },
  );
});
