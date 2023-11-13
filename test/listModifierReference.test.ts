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


    describe('preserve', () => {
      it('should preserve modifiers', () => {
        // given:
        const key = getListKey();
        const initialList = ['1', '2', '3'];
        const { result } = renderGenericListHook(key, initialList);
        const { current: { addItem } } = result;

        // when:
        act(() => result.current.addItem('5'));
        // then:
        expect(addItem).toBe(result.current.addItem);
      });
    });
  },
);
