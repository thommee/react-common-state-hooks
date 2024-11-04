import { act } from '@testing-library/react';
import { getReduxListHook, getReduxRecordHook, getReduxValueHook } from '../testUtils/createReduxWrappers';
import { getInMemoryListHook, getInMemoryRecordHook, getInMemoryValueHook } from '../testUtils/createInMemoryWrappers';
import {
  getLocalStorageListHook,
  getLocalStorageRecordHook,
  getLocalStorageValueHook,
} from '../testUtils/createLocalStorageWrappers';

import {
  getSessionStorageRecordHook,
  getSessionStorageListHook,
  getSessionStorageValueHook,
} from '../testUtils/createSessionStorageWrappers';

describe('stable api reference', () => {
  const getKey = () => 's.' + Math.random() + '.key';

  describe.each`
    renderListHook                                   | description
    ${getReduxListHook().renderGenericHook}          | ${'redux'}
    ${getInMemoryListHook().renderGenericHook}       | ${'inMemory'}
    ${getLocalStorageListHook().renderGenericHook}   | ${'localStorage'}
    ${getSessionStorageListHook().renderGenericHook} | ${'sessionStorage'}
  `(
    'useListHook: $description',
    ({
      renderListHook,
    }: {
      renderListHook:
        | ReturnType<typeof getReduxListHook>['renderGenericHook']
        | ReturnType<typeof getInMemoryListHook>['renderGenericHook']
        | ReturnType<typeof getLocalStorageListHook>['renderGenericHook'];
    }) => {
      it('should have stable list value', () => {
        // given:
        const key = getKey();
        const initialList = ['1', '2', '3'];
        const { result } = renderListHook(key, initialList);
        const {
          current: [list],
        } = result;
        // when:
        act(() => result.current[3](initialList));
        // then:
        expect(list).not.toBe(result.current[0]);
        expect(list).toStrictEqual(result.current[0]);
      });
      it('should have stable .addItem modifier', () => {
        // given:
        const key = getKey();
        const initialList = ['1', '2', '3'];
        const { result } = renderListHook(key, initialList);
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
        const { result } = renderListHook(key, initialList);
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
        const { result } = renderListHook(key, initialList);
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
    renderValueHook                                   | description
    ${getReduxValueHook().renderGenericHook}          | ${'redux'}
    ${getInMemoryValueHook().renderGenericHook}       | ${'inMemory'}
    ${getLocalStorageValueHook().renderGenericHook}   | ${'localStorage'}
    ${getSessionStorageValueHook().renderGenericHook} | ${'sessionStorage'}
  `(
    'useValueHook: $description',
    ({
      renderValueHook,
    }: {
      renderValueHook:
        | ReturnType<typeof getReduxValueHook>['renderGenericHook']
        | ReturnType<typeof getInMemoryValueHook>['renderGenericHook']
        | ReturnType<typeof getLocalStorageValueHook>['renderGenericHook'];
    }) => {
      it('should have stable value', () => {
        // given:
        const key = getKey();
        const initialValue = { some: 'value' };
        const { result } = renderValueHook(key, initialValue);
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
        const { result } = renderValueHook(key, initialValue);
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
    renderRecordHook                                   | description
    ${getReduxRecordHook().renderGenericHook}          | ${'redux'}
    ${getInMemoryRecordHook().renderGenericHook}       | ${'inMemory'}
    ${getLocalStorageRecordHook().renderGenericHook}   | ${'localStorage'}
    ${getSessionStorageRecordHook().renderGenericHook} | ${'sessionStorage'}
  `(
    'useRecordHook: $description',
    ({
      renderRecordHook,
    }: {
      renderRecordHook:
        | ReturnType<typeof getReduxRecordHook>['renderGenericHook']
        | ReturnType<typeof getInMemoryRecordHook>['renderGenericHook']
        | ReturnType<typeof getLocalStorageRecordHook>['renderGenericHook'];
    }) => {
      it('should have stable record value', () => {
        // given:
        const key = getKey();
        const initialList = { a: '5' };
        const { result } = renderRecordHook(key, initialList);
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
        const { result } = renderRecordHook(key, initialList);
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
        const { result } = renderRecordHook(key, initialList);
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
        const { result } = renderRecordHook(key, initialList);
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
