import { act } from '@testing-library/react';
import { getInMemoryGenericListHook, getReduxGenericListHook } from './utils/createHooksWrappers';

describe.each`
  renderGenericListHook                                 | description
  ${getReduxGenericListHook().renderGenericListHook}    | ${'redux'}
  ${getInMemoryGenericListHook().renderGenericListHook} | ${'inMemory'}
`('$description: useGenericList', ({ renderGenericListHook }) => {
  const getListKey = () => 's.' + Math.random() + '.key';

  describe('general initialization', () => {
    it.each`
      initialList     | expectedList
      ${undefined}    | ${[]}
      ${[]}           | ${[]}
      ${[1]}          | ${[1]}
      ${['1']}        | ${['1']}
      ${[{ a: '1' }]} | ${[{ a: '1' }]}
    `('should return empty array when initialList = $initialList', ({ initialList, expectedList }) => {
      // given:
      const { list } = renderGenericListHook(getListKey(), initialList).result.current;
      // then:
      expect(list).toEqual(expectedList);
      expect(list).not.toBe(expectedList);
    });

    it('should use initialValue only at start', () => {
      // given:
      const key = 'key';
      const initialValue = ['initial'];
      const newValue = ['newValue'];
      const newValue2: string[] = [];
      const { result } = renderGenericListHook(key, initialValue);
      expect(result.current.list).toBe(initialValue);
      // when:
      act(() => result.current.setList(newValue));
      expect(result.current.list).toBe(newValue);
      // when:
      act(() => result.current.setList(newValue2));
      expect(result.current.list).toBe(newValue2);
    });
  });

  describe('.addItem', () => {
    it.each`
      itemToAdd     | expectedResult
      ${'1'}        | ${['1']}
      ${{ d: '1' }} | ${[{ d: '1' }]}
    `('should add item ($itemToAdd) when no initialList provided', ({ itemToAdd, expectedResult }) => {
      // given:
      const { list, addItem } = renderGenericListHook(getListKey()).result.current;
      // when:
      act(() => addItem(itemToAdd));
      // then:
      expect(list).toStrictEqual(expectedResult);
      expect(list[0]).toBe(itemToAdd);
    });

    it.each`
      initialList                 | itemToAdd     | expectedResult                          | description
      ${[]}                       | ${'1'}        | ${['1']}                                | ${'[]'}
      ${['0']}                    | ${'1'}        | ${['0', '1']}                           | ${'["0"]'}
      ${['0', '1']}               | ${'1'}        | ${['0', '1', '1']}                      | ${'["0", "1"] (allow to add existed value)'}
      ${['0', '1']}               | ${'2'}        | ${['0', '1', '2']}                      | ${'["0", "1"]'}
      ${[]}                       | ${{ d: '1' }} | ${[{ d: '1' }]}                         | ${'[]'}
      ${[{ d: '0' }]}             | ${{ d: '1' }} | ${[{ d: '0' }, { d: '1' }]}             | ${'[{ d: "0" }]'}
      ${[{ d: '0' }, { d: '1' }]} | ${{ d: '1' }} | ${[{ d: '0' }, { d: '1' }, { d: '1' }]} | ${'[{ d: "0" }, { d: "1" }] (allow to add existed value)'}
      ${[{ d: '0' }, { d: '1' }]} | ${{ d: '2' }} | ${[{ d: '0' }, { d: '1' }, { d: '2' }]} | ${'[{ d: "0" }, { d: "1" }]'}
    `('should add $itemToAdd when initialList=$description', ({ initialList, itemToAdd, expectedResult }) => {
      // given:
      const { list, addItem } = renderGenericListHook(getListKey(), initialList).result.current;
      // when:
      act(() => addItem(itemToAdd));
      // then:
      expect(list[0]).toBe(initialList[0]);
      expect(list[expectedResult.length - 1]).toBe(itemToAdd);
      expect(list).toStrictEqual(expectedResult);
    });

    it.each`
      initialList   | itemToAdd | distinct | expectedResult
      ${[]}         | ${'1'}    | ${true}  | ${['1']}
      ${[]}         | ${'1'}    | ${false} | ${['1']}
      ${['0']}      | ${'0'}    | ${true}  | ${['0']}
      ${['0']}      | ${'0'}    | ${false} | ${['0', '0']}
      ${['0', '1']} | ${'1'}    | ${true}  | ${['0', '1']}
      ${['0', '1']} | ${'1'}    | ${false} | ${['0', '1', '1']}
    `(
      'should add "$itemToAdd" when distinct="$distinct" and initialList=$initialList',
      ({ initialList, itemToAdd, distinct, expectedResult }) => {
        // given:
        const { list, addItem } = renderGenericListHook(getListKey(), initialList, undefined, { distinct }).result
          .current;
        // when:
        act(() => addItem(itemToAdd));
        // then:
        expect(list[0]).toBe(initialList[0]);
        expect(list[expectedResult.length - 1]).toBe(itemToAdd);
        expect(list).toStrictEqual(expectedResult);
      },
    );

    it.each`
      initialList   | itemToAdd | prepend  | expectedResult
      ${[]}         | ${'1'}    | ${true}  | ${['1']}
      ${[]}         | ${'1'}    | ${false} | ${['1']}
      ${['0']}      | ${'1'}    | ${true}  | ${['1', '0']}
      ${['0']}      | ${'1'}    | ${false} | ${['0', '1']}
      ${['0', '1']} | ${'2'}    | ${true}  | ${['2', '0', '1']}
      ${['0', '1']} | ${'2'}    | ${false} | ${['0', '1', '2']}
    `(
      'should add "$itemToAdd" when prepend="$prepend" and initialList=$initialList',
      ({ initialList, itemToAdd, prepend, expectedResult }) => {
        // given:
        const { list, addItem } = renderGenericListHook(getListKey(), initialList, undefined, { prepend }).result
          .current;
        // when:
        act(() => addItem(itemToAdd));
        // then:
        expect(list[prepend ? 0 : expectedResult.length - 1]).toBe(itemToAdd);
        expect(list).toStrictEqual(expectedResult);
      },
    );

    it.each`
      initialList   | itemToAdd | skipIfExist | expectedResult
      ${[]}         | ${'1'}    | ${true}     | ${['1']}
      ${[]}         | ${'1'}    | ${false}    | ${['1']}
      ${['1']}      | ${'1'}    | ${true}     | ${['1']}
      ${['1']}      | ${'1'}    | ${false}    | ${['1', '1']}
      ${['0', '1']} | ${'1'}    | ${true}     | ${['0', '1']}
      ${['0', '1']} | ${'1'}    | ${false}    | ${['0', '1', '1']}
    `(
      'should add "$itemToAdd" when skipIfExist="$skipIfExist" and initialList=$initialList for scalars',
      ({ initialList, itemToAdd, skipIfExist, expectedResult }) => {
        // given:
        const { list, addItem } = renderGenericListHook(getListKey(), initialList, undefined, { skipIfExist }).result
          .current;
        // when:
        act(() => addItem(itemToAdd));
        // then:
        expect(list[expectedResult.length - 1]).toEqual(itemToAdd);
        expect(list).toStrictEqual(expectedResult);
      },
    );

    it.each`
      initialList                 | itemToAdd     | skipIfExist | expectedResult
      ${[]}                       | ${{ a: '1' }} | ${true}     | ${[{ a: '1' }]}
      ${[]}                       | ${{ a: '1' }} | ${false}    | ${[{ a: '1' }]}
      ${[{ a: '1' }]}             | ${{ a: '1' }} | ${true}     | ${[{ a: '1' }]}
      ${[{ a: '1' }]}             | ${{ a: '1' }} | ${false}    | ${[{ a: '1' }, { a: '1' }]}
      ${[{ a: '0' }, { a: '1' }]} | ${{ a: '1' }} | ${true}     | ${[{ a: '0' }, { a: '1' }]}
      ${[{ a: '0' }, { a: '1' }]} | ${{ a: '1' }} | ${false}    | ${[{ a: '0' }, { a: '1' }, { a: '1' }]}
    `(
      '$#: should add "$itemToAdd" when skipIfExist="$skipIfExist" and initialList=$initialList for objects',
      ({ initialList, itemToAdd, skipIfExist, expectedResult }) => {
        // given:
        const areEqual = (item1: typeof itemToAdd, item2: typeof itemToAdd) => item1.a === item2.a;
        const { list, addItem } = renderGenericListHook(getListKey(), initialList, areEqual, { skipIfExist }).result
          .current;
        // when:
        act(() => addItem(itemToAdd));
        // then:
        expect(list[expectedResult.length - 1])[skipIfExist ? 'toEqual' : 'toBe'](itemToAdd);
        expect(list).toStrictEqual(expectedResult);
      },
    );

    it.each`
      initialList                 | itemToAdd     | prepend  | skipIfExist | expectedResult
      ${[{ a: '0' }, { a: '1' }]} | ${{ a: '1' }} | ${true}  | ${true}     | ${[{ a: '0' }, { a: '1' }]}
      ${[{ a: '0' }, { a: '1' }]} | ${{ a: '1' }} | ${true}  | ${false}    | ${[{ a: '1' }, { a: '0' }, { a: '1' }]}
      ${[{ a: '0' }, { a: '1' }]} | ${{ a: '1' }} | ${false} | ${true}     | ${[{ a: '0' }, { a: '1' }]}
      ${[{ a: '0' }, { a: '1' }]} | ${{ a: '1' }} | ${false} | ${false}    | ${[{ a: '0' }, { a: '1' }, { a: '1' }]}
    `(
      '$#: should add "$itemToAdd" when prepend="$prepend", skipIfExist="$skipIfExist" for objects',
      ({ initialList, itemToAdd, prepend, skipIfExist, expectedResult }) => {
        // given:
        const areEqual = (item1: typeof itemToAdd, item2: typeof itemToAdd) => item1.a === item2.a;
        const { list, addItem } = renderGenericListHook(getListKey(), initialList, areEqual, { prepend, skipIfExist })
          .result.current;
        // when:
        act(() => addItem(itemToAdd));
        // then:
        expect(list[prepend && !skipIfExist ? 0 : expectedResult.length - 1])[skipIfExist ? 'toEqual' : 'toBe'](
          itemToAdd,
        );
        expect(list).toStrictEqual(expectedResult);
      },
    );

    it.each`
      initialList                 | itemToAdd     | prepend  | distinct | expectedResult
      ${[{ a: '0' }, { a: '1' }]} | ${{ a: '1' }} | ${true}  | ${true}  | ${[{ a: '1' }, { a: '0' }]}
      ${[{ a: '0' }, { a: '1' }]} | ${{ a: '1' }} | ${true}  | ${false} | ${[{ a: '1' }, { a: '0' }, { a: '1' }]}
      ${[{ a: '0' }, { a: '1' }]} | ${{ a: '1' }} | ${false} | ${true}  | ${[{ a: '0' }, { a: '1' }]}
      ${[{ a: '0' }, { a: '1' }]} | ${{ a: '1' }} | ${false} | ${false} | ${[{ a: '0' }, { a: '1' }, { a: '1' }]}
    `(
      '$#: should add "$itemToAdd" when prepend="$prepend", distinct="$distinct" for objects',
      ({ initialList, itemToAdd, prepend, distinct, expectedResult }) => {
        // given:
        const areEqual = (item1: typeof itemToAdd, item2: typeof itemToAdd) => item1.a === item2.a;
        const { list, addItem } = renderGenericListHook(getListKey(), initialList, areEqual, { prepend, distinct })
          .result.current;
        // when:
        act(() => addItem(itemToAdd));
        // then:
        expect(list[prepend ? 0 : expectedResult.length - 1])[distinct ? 'toBe' : 'toEqual'](itemToAdd);
        expect(list).toStrictEqual(expectedResult);
      },
    );

    it.each`
      initialList                 | itemToAdd     | distinct | skipIfExist | expectedResult
      ${[{ a: '0' }, { a: '1' }]} | ${{ a: '1' }} | ${true}  | ${true}     | ${[{ a: '0' }, { a: '1' }]}
      ${[{ a: '0' }, { a: '1' }]} | ${{ a: '1' }} | ${true}  | ${false}    | ${[{ a: '0' }, { a: '1' }]}
      ${[{ a: '0' }, { a: '1' }]} | ${{ a: '1' }} | ${false} | ${true}     | ${[{ a: '0' }, { a: '1' }]}
      ${[{ a: '0' }, { a: '1' }]} | ${{ a: '1' }} | ${false} | ${false}    | ${[{ a: '0' }, { a: '1' }, { a: '1' }]}
    `(
      '$#: should add "$itemToAdd" when distinct="$distinct", skipIfExist="$skipIfExist" for objects',
      ({ initialList, itemToAdd, distinct, skipIfExist, expectedResult }) => {
        // given:
        const areEqual = (item1: typeof itemToAdd, item2: typeof itemToAdd) => item1.a === item2.a;
        const { list, addItem } = renderGenericListHook(getListKey(), initialList, areEqual, { distinct, skipIfExist })
          .result.current;
        // when:
        act(() => addItem(itemToAdd));
        // then:
        expect(list[expectedResult.length - 1])[skipIfExist ? 'toEqual' : 'toBe'](itemToAdd);
        expect(list).toStrictEqual(expectedResult);
      },
    );
  });

  describe('.removeItem', () => {
    it.each`
      initialList   | itemToRemove | expectedList
      ${['3', '4']} | ${'3'}       | ${['4']}
      ${['3', '4']} | ${'3'}       | ${['4']}
      ${[]}         | ${'5'}       | ${[]}
      ${undefined}  | ${'5'}       | ${[]}
    `('should remove "$itemToRemove" from $initialList for scalars', ({ initialList, itemToRemove, expectedList }) => {
      // given:
      const { list, removeItem } = renderGenericListHook(getListKey(), initialList).result.current;
      // when:
      act(() => removeItem(itemToRemove));
      // then:
      expect(list).toStrictEqual(expectedList);
    });

    it.each`
      initialList                 | itemToRemove  | expectedList
      ${[{ a: '3' }, { a: '4' }]} | ${{ a: '3' }} | ${[{ a: '4' }]}
      ${[{ a: '3' }, { a: '4' }]} | ${{ a: '3' }} | ${[{ a: '4' }]}
      ${[]}                       | ${{ a: '5' }} | ${[]}
      ${undefined}                | ${{ a: '5' }} | ${[]}
    `('should remove "$itemToRemove" from $initialList for objects', ({ initialList, itemToRemove, expectedList }) => {
      // given:
      const areEqual = (item1: typeof itemToRemove, item2: typeof itemToRemove) => item1.a === item2.a;
      const { list, removeItem } = renderGenericListHook(getListKey(), initialList, areEqual).result.current;
      // when:
      act(() => removeItem(itemToRemove));
      // then:
      expect(list).toStrictEqual(expectedList);
    });
  });

  describe('.setList', () => {
    it.each`
      initialList        | newList
      ${undefined}       | ${[]}
      ${[]}              | ${[]}
      ${[]}              | ${['3']}
      ${['1', '2', '3']} | ${['7']}
      ${['1', '2', '3']} | ${[]}
    `('should set list from initialList="$initialList" to newList="$newList', async ({ initialList, newList }) => {
      // given:
      const key = getListKey();
      const { result } = renderGenericListHook(key, initialList);
      // when:
      act(() => result.current.setList(newList));
      // then:
      expect(result.current.list).toBe(newList);
    });
  });

  describe('multiple usage', () => {
    it('should return the same lists for multiple hook usages', () => {
      // given:
      const key = getListKey();
      const initialList = ['1', '2', '3'];
      // when:
      const { list: list1 } = renderGenericListHook(key, initialList).result.current;
      const { list: list2 } = renderGenericListHook(key, initialList).result.current;
      // then:
      expect(list1).toBe(list2);
    });

    it('should addItem to all lists when the same key is used multiple times', () => {
      // given:
      const key = getListKey();
      const initialList = ['1', '2', '3'];
      const itemToAdd1 = '4';
      const itemToAdd2 = '5';
      const { list: list1, addItem: addItem1 } = renderGenericListHook(key, initialList).result.current;
      const { list: list2, addItem: addItem2 } = renderGenericListHook(key, initialList).result.current;

      // when:
      act(() => addItem1(itemToAdd1)); // then:
      expect(list1).toEqual(['1', '2', '3', '4']);
      expect(list1).toBe(list2);

      // when:
      act(() => addItem2(itemToAdd2)); // then:
      expect(list2).toEqual(['1', '2', '3', '4', '5']);
      expect(list1).toBe(list2);
    });

    it('should removeItem from all lists when the same key is used multiple times', () => {
      // given:
      const key = getListKey();
      const initialList = ['1', '2', '3'];
      const itemToRemove1 = '2';
      const itemToRemove2 = '3';
      const { list: list1, removeItem: removeItem1 } = renderGenericListHook(key, initialList).result.current;
      const { list: list2, removeItem: removeItem2 } = renderGenericListHook(key, initialList).result.current;

      // when:
      act(() => removeItem1(itemToRemove1)); // then:
      expect(list1).toEqual(['1', '3']);
      expect(list1).toBe(list2);

      // when:
      act(() => removeItem2(itemToRemove2)); // then:
      expect(list2).toEqual(['1']);
      expect(list1).toBe(list2);
    });
  });
});
