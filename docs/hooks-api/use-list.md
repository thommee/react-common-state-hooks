
### useList Interfaces
```typescript title="useList parameters"
interface useList<ListItem> {
  (
      key: string,
      initialValue: ListItem[],
      defaultOptions?: ListOptions<ListItem>
  ): UseListApi<ListItem>
}

type ListOptions<ListItem> = {
    prepend?: boolean;
    unique?: boolean;
    skipIfExist?: boolean;
    areEqual?: EqualityFn<ListItem>;
};

interface EqualityFn<ListItem> {
    (t1: ListItem, t2: ListItem): boolean;
}
```

```typescript title="useList returned values"
type UseListApi<ListItem> = [
    list: ListItem[],
    addItem: (listItem: ListItem) => void,
    removeItem: (listItem: ListItem) => void,
    setList: SetValue<ListItem[]>,
];

interface SetValue<List> {
  (value: List): void;
  (valueFn: (oldValue: List) => List): void;
}
```

### useList API
```typescript
type Item = { id: string; text: string };

const listOptions: ListOptions<Item> = {
    unique: true,
    skipIfExist: true,
    prepend: true,
    areEqual: (a, b) => a.id === b.id
}

const [list, addItem, removeItem, setList] = useList('my-key', [], listOptions);
```

### Adding items

#### Append or prepend? 
As default, new items are added at the end of the list.<br/>
With `prepend` option you can add new items at the beginning of the list.


=== "append items"
    ```typescript title="New items are added at the end of the list (default behavior)"
    const [list, addItem] = useList<string>('key', ['a', 'b', 'c']);
    
                    // list: ['a', 'b', 'c']
    addItem('b');   // list: ['a', 'b', 'c', 'b']
    addItem('x');   // list: ['a', 'b', 'c', 'b', 'x']
    ```
=== "prepend items"
    ```typescript title="New items are added at the beginning of the list"
    const listOptions: ListOptions<string> = { prepend: true };
    const [list, addItem] = useList<string>('key', ['a', 'b', 'c'], listOptions);
    
                    // list: ['a', 'b', 'c']
    addItem('b');   // list: ['a', 'b', 'c', 'b']
    addItem('x');   // list: ['x', 'b', 'a', 'b', 'c']
    ```

---
#### Uniqueness check
The `unique` option enables a mechanism ensuring the uniqueness of elements in a list. 

When activated, attempting to add an element that already exists on the list results 
in the removal of the existing element and the addition of the new one at the beginning/end of the list.

It means that new items are **always** added to the list, and existing ones are **always** removed.
=== "scalar items list"
    ```typescript
    const listOptions: ListOptions<string> = { unique: true };
    const [list, addItem] = useList<string>('some-key', ['a', 'b', 'c'], listOptions);
    
                    // list: ['a', 'b', 'c']
    addItem('b');   // list: ['a', 'c', 'b']
    addItem('x');   // list: ['a', 'c', 'b', 'x']
    ```
=== "complex items list"
    ```typescript
    type Item = { id: string; }

    const listOptions: ListOptions<Item> = {
        unique: true,
        areEqual: (a: Item, b: Item) => a.id === b.id
    };
    const initialValue = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    const [list, addItem] = useList<Item>('some-key', initialValue, listOptions);

                    // list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    addItem('b');   // list: [{ id: 'a' }, { id: 'c' }, { id: 'b' }]
    addItem('x');   // list: [{ id: 'a' }, { id: 'c' }, { id: 'b' }, { id: 'x' }]
    ```
With `skipIfExist` option you can change this behavior.

By default, `unique` option is set to the "replace" mode. However, it can be customized with the
additional `skipIfExist` option. When this option is enabled, attempting to add an existing
element does not affect the list, and the operation is ignored.

=== "scalar items list" 
    ```typescript
    const listOptions: ListOptions<string> = { unique: true, skipIfExist: true };
    const [, addItem] = useList<string>('some-key', ['a', 'b', 'c'], listOptions);

                    // list: ['a', 'b', 'c']
    addItem('b');   // list: ['a', 'b', 'c']
    addItem('x');   // list: ['a', 'b', 'c', 'x']    
    ```
=== "complex items list"
    ```typescript
    type Item = { id: string; text: string; }

    const listOptions: ListOptions<Item> = {
        unique: true,
        skipIfExist: true,
        areEqual: (a: Item, b: Item) => a.id === b.id
    };
    const initialValue = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    const [list, addItem] = useList<Item>('some-key', initialValue, listOptions);

                    // list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    addItem('b');   // list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    addItem('x');   // list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'x' }]
    ```

---
### Removing items
#### Remove item

=== "scalar items list"
    ```typescript
    const [list,, removeItem] = useList<string>('some-key', ['a', 'b', 'c']);
    
                        // list: ['a', 'b', 'c']
    removeItem('b');    // list: ['a', 'c']
    removeItem('x');    // list: ['a', 'c']  
    ```
=== "complex items list"
    ```typescript
    type Item = { id: string, text: string };
    
    const listOptions = {
        areEqual: (a: Item, b: Item) => a.id === b.id
    }
    const initialValue = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    const [list,, removeItem] = useList<Item>('key', initialValue, listOptions);
    
                                // list: [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    removeItem({ id: 'b' });    // list: [{ id: 'a' }, { id: 'c' }]
    removeItem({ id: 'x' });    // list: [{ id: 'a' }, { id: 'c' }]
    ```

### Setting new lists
#### Set new list by new value
You can set new list by calling `setList` with new list parameter.
```typescript
const [list,,, setList] = useList<string>('some-key', ['a', 'b', 'c']);

                      // list: ['a', 'b', 'c']
setList(['x', 'y']);  // list: ['x', 'y']
setList(['a']);       // list: ['a']
```
#### Set new list by callback
If value provided to `setList` is a function, it will be called with _oldValue_ parameter, 
and returned value from this function will be set as new list. 

With this mechanism you can resolve new value based on old value.
```typescript
const [,,, setList] = useList<string>('some-key', []);

const setNewListIfEmpty = (newList: string[]) => 
    setList((oldList: string[]) => {
        return (oldList.length > 0) ? oldList : newList;
    }
);
                                // list: []
setNewListIfEmpty(['x', 'y']);  // list: ['x', 'y']
setNewListIfEmpty(['a']);       // list: ['x', 'y']
```
