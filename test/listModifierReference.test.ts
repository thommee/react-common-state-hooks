import { act } from '@testing-library/react';
import { getReduxGenericListHook } from './hooks/utils/createReduxWrappers';
import { getInMemoryGenericListHook } from './hooks/utils/createInMemoryWrappers';

describe.each`
  renderGenericListHook                                 | description
  ${getReduxGenericListHook().renderGenericListHook}    | ${'redux'}
  ${getInMemoryGenericListHook().renderGenericListHook} | ${'inMemory'}
`(
  '$description: list mod ref',
  ({
     renderGenericListHook,
   }: {
    renderGenericListHook:
      | ReturnType<typeof getReduxGenericListHook>['renderGenericListHook']
      | ReturnType<typeof getInMemoryGenericListHook>['renderGenericListHook'];
  }) => {
    const getListKey = () => 's.' + Math.random() + '.key';


    describe('stable modifiers references', () => {
      it('should have stable .addItem modifier', () => {
        // given:
        const key = getListKey();
        const initialList = ['1', '2', '3'];
        const { result } = renderGenericListHook(key, initialList);
        const { current: [, addItem] } = result;

        // when:
        act(() => result.current[1]('5'));
        // then:
        expect(addItem).toBe(result.current[1]);
      });

      it('should have stable .removeItem modifier', () => {
        // given:
        const key = getListKey();
        const initialList = ['1', '2', '3'];
        const { result } = renderGenericListHook(key, initialList);
        const { current: [,, removeItem] } = result;

        // when:
        act(() => result.current[2]('3'));
        // then:
        expect(removeItem).toBe(result.current[2]);
      });

      it('should have stable .setList modifier', () => {
        // given:
        const key = getListKey();
        const initialList = ['1', '2', '3'];
        const { result } = renderGenericListHook(key, initialList);
        const { current: [,,, setList] } = result;

        // when:
        act(() => result.current[3](['9']));
        // then:
        expect(setList).toBe(result.current[3]);
      });
    });
  },
);
