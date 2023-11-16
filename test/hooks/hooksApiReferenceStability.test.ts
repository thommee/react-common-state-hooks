import { act } from '@testing-library/react';
import {
  getReduxGenericListHook,
  getReduxGenericRecordHook,
  getReduxGenericValueHook,
} from '../testUtils/createReduxWrappers';
import {
  getInMemoryGenericListHook,
  getInMemoryGenericRecordHook,
  getInMemoryGenericValueHook,
} from '../testUtils/createInMemoryWrappers';
import {
  getLocalStorageGenericListHook,
  getLocalStorageGenericRecordHook,
  getLocalStorageGenericValueHook,
} from '../testUtils/createLocalStorageWrappers';

describe('stable api reference', () => {
  const getKey = () => 's.' + Math.random() + '.key';

  describe.each`
    renderGenericListHook                                 | description
    ${getReduxGenericListHook().renderGenericHook}        | ${'redux'}
    ${getInMemoryGenericListHook().renderGenericHook}     | ${'inMemory'}
    ${getLocalStorageGenericListHook().renderGenericHook} | ${'localStorage'}
  `(
    'useGenericListHook: $description',
    ({
      renderGenericListHook,
    }: {
      renderGenericListHook:
        | ReturnType<typeof getReduxGenericListHook>['renderGenericHook']
        | ReturnType<typeof getInMemoryGenericListHook>['renderGenericHook']
        | ReturnType<typeof getLocalStorageGenericListHook>['renderGenericHook'];
    }) => {
      it('should have stable list value', () => {
        // given:
        const key = getKey();
        const initialList = ['1', '2', '3'];
        const { result } = renderGenericListHook(key, initialList);
        const {
          current: [list],
        } = result;
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
        const {
          current: [, addItem],
        } = result;

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
        const {
          current: [, , removeItem],
        } = result;

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
        const {
          current: [, , , setList],
        } = result;

        // when:
        act(() => result.current[3](['9']));
        // then:
        expect(setList).toBe(result.current[3]);
      });
    },
  );

  describe.each`
    renderGenericValueHook                                 | description
    ${getReduxGenericValueHook().renderGenericHook}        | ${'redux'}
    ${getInMemoryGenericValueHook().renderGenericHook}     | ${'inMemory'}
    ${getLocalStorageGenericValueHook().renderGenericHook} | ${'localStorage'}
  `(
    'useGenericValueHook: $description',
    ({
      renderGenericValueHook,
    }: {
      renderGenericValueHook:
        | ReturnType<typeof getReduxGenericValueHook>['renderGenericHook']
        | ReturnType<typeof getInMemoryGenericValueHook>['renderGenericHook']
        | ReturnType<typeof getLocalStorageGenericValueHook>['renderGenericHook'];
    }) => {
      it('should have stable value', () => {
        // given:
        const key = getKey();
        const initialValue = { some: 'value' };
        const { result } = renderGenericValueHook(key, initialValue);
        const {
          current: [value],
        } = result;
        // when:
        act(() => result.current[1](initialValue));
        // then:
        expect(value).toBe(result.current[0]);
      });
      it('should have stable setter', () => {
        // given:
        const key = getKey();
        const initialValue = { some: 'value' };
        const { result } = renderGenericValueHook(key, initialValue);
        const {
          current: [, setValue],
        } = result;
        // when:
        act(() => result.current[1]({ another: 'value' }));
        // then:
        expect(setValue).toBe(result.current[1]);
      });
    },
  );

  describe.each`
    renderGenericRecordHook                                 | description
    ${getReduxGenericRecordHook().renderGenericHook}        | ${'redux'}
    ${getInMemoryGenericRecordHook().renderGenericHook}     | ${'inMemory'}
    ${getLocalStorageGenericRecordHook().renderGenericHook} | ${'localStorage'}
  `(
    'useGenericRecordHook: $description',
    ({
      renderGenericRecordHook,
    }: {
      renderGenericRecordHook:
        | ReturnType<typeof getReduxGenericRecordHook>['renderGenericHook']
        | ReturnType<typeof getInMemoryGenericRecordHook>['renderGenericHook']
        | ReturnType<typeof getLocalStorageGenericRecordHook>['renderGenericHook'];
    }) => {
      it('should have stable record value', () => {
        // given:
        const key = getKey();
        const initialList = { a: '5' };
        const { result } = renderGenericRecordHook(key, initialList);
        const {
          current: [record],
        } = result;
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
        const {
          current: [, addItem],
        } = result;

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
        const {
          current: [, , removeItem],
        } = result;

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
        const {
          current: [, , , setList],
        } = result;

        // when:
        act(() => result.current[3]({ b: '6' }));
        // then:
        expect(setList).toBe(result.current[3]);
      });
    },
  );
});
