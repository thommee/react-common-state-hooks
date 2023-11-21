
### useList Interfaces
```typescript title="useList parameters"
interface useList<ListItem> {
  (
      key: string,
      initialValue: ListItem[] = [],
      defaultOptions?: ListOptions<ListItem>
  ): UseListApi<ListItem>
}

type ListOptions<ListItem> = {
    prepend?: boolean;
    distinct?: boolean;
    skipIfExist?: boolean;
    areEqual?: EqualityFn<ListItem> = (a: ListItem, b: ListItem) => a === b;
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
    setList: SetValueFn<ListItem[]>,
];

interface SetValueFn<List> {
  (value: List): void;
  (valueFn: (oldValue: List) => List): void;
}
```

### useList API
```typescript
type Item = { id: string; text: string };

const listOptions: ListOptions<Item> = {
    distinct: true,
    skipIfExist: true,
    prepend: true,
    areEqual: (a, b) => a.id === b.id
}

const [list, addItem, removeItem, setList] = useList('my-key', [], listOptions);
```

### Adding items

#### You can add item at the beginning or at th end of the list. 
As default, new items are added at the end of the list.<br/>
With `prepend` option you can add new items at the beginning of the list.


=== "append items"
    ```typescript title="New items are added at the end of the list (default behaviour)"
    const [, addItem] = useList<string>('some-key');
    
    const addText = useCallback((item: string) => addItem(item), []);
    ```
=== "prepend items"
    ```typescript title="New items are added at the beginning of the list"
    const listOptions: ListOptions<string> = { prepend: true };
    const [, addItem] = useList<string>('some-key', [], listOptions);
    
    const addText = useCallback((item: string) => addItem(item), []);
    ```

---
#### Add item with distinction check
With `distinct` option you can enable distinction check.

As default this will **replace** existing items with the new one. It means that new items are **always** added 
at the beginning or at the end of the list, and existing items are removed.
=== "scalar items list"
    ```typescript
    const listOptions: ListOptions<string> = { distinct: true };
    const [, addItem] = useList<string>('some-key', [], listOptions);
    
    const addText = useCallback((item: string) => addItem(item), []);
    ```
=== "complex items list"
    ```typescript
    type Item = { id: string; text: string; }

    const listOptions: ListOptions<Item> = {
        distinct: true,
        areEqual: (a: Item, b: Item) => a.id === b.id
    };

    const [, addItem] = useList<Item>('some-key', [], listOptions);

    const addText = useCallback((item: Item) => addItem(item), []);
    ```
With `skipIfExist` option you can change this behaviour.

If provided, update will happen **only** if item **does not exist** in the list.<br/>
Otherwise it will do nothing.

=== "scalar items list" 
    ```typescript
    const listOptions: ListOptions<string> = { distinct: true, skipIfExist: true };
    const [, addItem] = useList<string>('some-key', [], listOptions);

    const addText = useCallback((item: string) => addItem(item), []);
    ```
=== "complex items list"
    ```typescript
    type Item = { id: string; text: string; }

    const listOptions: ListOptions<Item> = {
        distinct: true,
        skipIfExist: true,
        areEqual: (a: Item, b: Item) => a.id === b.id
    };

    const [, addItem] = useList<Item>('some-key', [], listOptions);

    const addText = useCallback((item: Item) => addItem(item), []);
    ```

---
### Removing items
#### Remove item

=== "scalar items list"
    ```typescript
    const [,, removeItem] = useList<string>('some-key');
    
    const removeText = useCallback((item: string) => removeItem(item), []);
    ```
=== "complex items list"
    ```typescript
    type Item = { id: string, text: string };
    
    const listOptions = {
        areEqual: (a: Item, b: Item) => a.id === b.id
    }
    const [,, removeItem] = useList<Item>('some-key', [], listOptions);
    
    const removeElement = useCallback((item: Item) => removeItem(item), []);
    ```

### Setting new lists
#### Set new list by new value
You can set new list by calling `setList` with new list parameter.
```typescript
const [,,, setList] = useList<string>('some-key');

const setNewList = useCallback((newList: string[]) => setList(newList), []);
```
#### Set new list by callback
If value provided to `setList` is a function, it will be called with one parameter _oldValue_, 
and returned value from this function will be set as new list. 

With this mechanism you can resolve new value based on old value.
```typescript
const [,,, setList] = useList<string>('some-key');

const setNewListIfEmpty = useCallback((newList: string[]) => 
    setList((oldList: string[]) => {
        return (oldList.length > 0) ? oldList : newList;
    }
), []);
```