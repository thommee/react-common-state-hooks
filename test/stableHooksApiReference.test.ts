import { act } from '@testing-library/react';
import {
  getReduxGenericListHook,
  getReduxGenericRecordHook,
  getReduxGenericValueHook,
} from './hooks/utils/createReduxWrappers';
import {
  getInMemoryGenericListHook,
  getInMemoryGenericRecordHook,
  getInMemoryGenericValueHook,
} from './hooks/utils/createInMemoryWrappers';

describe('stable api reference', () => {
  const getKey = () => 's.' + Math.random() + '.key';

  describe.each`
  renderGenericListHook                                 | description
  ${getReduxGenericListHook().renderGenericListHook}    | ${'redux'}
  ${getInMemoryGenericListHook().renderGenericListHook} | ${'inMemory'}
`(
    'useGenericListHook: $description',
    ({
       renderGenericListHook,
     }: {
      renderGenericListHook:
        | ReturnType<typeof getReduxGenericListHook>['renderGenericListHook']
        | ReturnType<typeof getInMemoryGenericListHook>['renderGenericListHook'];
    }) => {
      it('should have stable list value', () => {
        // given:
        const key = getKey();
        const initialList = ['1', '2', '3'];
        const { result } = renderGenericListHook(key, initialList);
        const { current: [list] } = result;
        // when:
        act(() => result.current[3](initialList));
        // then:
        expect(list).toBe(result.current[0]);
      });
      it('should have stable .addItem modifier', () => {
          // given:
          const key = getKey();
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
          const key = getKey();
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
          const key = getKey();
          const initialList = ['1', '2', '3'];
          const { result } = renderGenericListHook(key, initialList);
          const { current: [,,, setList] } = result;

          // when:
          act(() => result.current[3](['9']));
          // then:
          expect(setList).toBe(result.current[3]);
        });
    },
  );

  describe.each`
  renderGenericValueHook                               | description
  ${getReduxGenericValueHook().renderGenericValueHook} | ${'redux'}
  ${getInMemoryGenericValueHook().renderGenericValueHook} | ${'inMemory'}
`(
    'useGenericValueHook: $description',
    ({
       renderGenericValueHook,
     }: {
      renderGenericValueHook:
        | ReturnType<typeof getReduxGenericValueHook>['renderGenericValueHook']
        | ReturnType<typeof getInMemoryGenericValueHook>['renderGenericValueHook'];
    }) => {
      it('should have stable value', () => {
        // given:
        const key = getKey();
        const initialValue = {some: 'value'};
        const { result } = renderGenericValueHook(key, initialValue);
        const { current: [value] } = result;
        // when:
        act(() => result.current[1](initialValue));
        // then:
        expect(value).toBe(result.current[0]);
      });
      it('should have stable setter', () => {
        // given:
        const key = getKey();
        const initialValue = {some: 'value'};
        const { result } = renderGenericValueHook(key, initialValue);
        const { current: [, setValue] } = result;
        // when:
        act(() => result.current[1]({ another: 'value' }));
        // then:
        expect(setValue).toBe(result.current[1]);
      });
    },
  );

  describe.each`
  renderGenericRecordHook                                   | description
  ${getReduxGenericRecordHook().renderGenericRecordHook}    | ${'redux'}
  ${getInMemoryGenericRecordHook().renderGenericRecordHook} | ${'inMemory'}
`(
    'useGenericRecordHook: $description',
    ({
       renderGenericRecordHook,
     }: {
      renderGenericRecordHook:
        | ReturnType<typeof getReduxGenericRecordHook>['renderGenericRecordHook']
        | ReturnType<typeof getInMemoryGenericRecordHook>['renderGenericRecordHook'];
    }) => {
      it('should have stable record value', () => {
        // given:
        const key = getKey();
        const initialList = {a: '5'};
        const { result } = renderGenericRecordHook(key, initialList);
        const { current: [record] } = result;
        // when:
        act(() => result.current[3](initialList));
        // then:
        expect(record).toBe(result.current[0]);
      });
      it('should have stable .addItem modifier', () => {
        // given:
        const key = getKey();
        const initialList = { a: '1' };
        const { result } = renderGenericRecordHook(key, initialList);
        const { current: [, addItem] } = result;

        // when:
        act(() => result.current[1]('a', '5'));
        // then:
        expect(addItem).toBe(result.current[1]);
      });
      it('should have stable .removeItem modifier', () => {
        // given:
        const key = getKey();
        const initialList = { a: '8' };
        const { result } = renderGenericRecordHook(key, initialList);
        const { current: [,, removeItem] } = result;

        // when:
        act(() => result.current[2]('a'));
        // then:
        expect(removeItem).toBe(result.current[2]);
      });
      it('should have stable .setRecord modifier', () => {
        // given:
        const key = getKey();
        const initialList = { a: '3' };
        const { result } = renderGenericRecordHook(key, initialList);
        const { current: [,,, setList] } = result;

        // when:
        act(() => result.current[3]({ b: '6' }));
        // then:
        expect(setList).toBe(result.current[3]);
      });

    },
  );

});
