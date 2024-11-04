
### Interface
```typescript title="Parameters"
interface useRecord<RecordItem> {
  (key: string, initialValue?: Record<string, RecordItem>
  ): UseRecordApi<RecordItem>
}
```

```typescript title="Returned value"
type UseRecordApi<RecordItem> = [
  record: Record<string, RecordItem>,
  addItem: (key: string, recordItem: RecordItem) => void,
  removeItem: (key: string) => void,
  setRecord: SetValue<Record<string, RecordItem>>,
];

interface SetValue<Record> {
  (value: Record): void;
  (valueFn: (oldValue: Record) => Record): void;
}
```

### Adding items

```typescript 
const [record, addItem] = useRecord<string>('some-key');

                    // record: {}
addItem('a', 'A');  // record: { a: 'A' }
addItem('b', 'B');  // record: { a: 'A', b: 'B' }
addItem('a', 'C');  // record: { a: 'C', b: 'B' }
```

---
### Removing items
#### Remove item

```typescript
const initialValue = { a: 'A', b: 'B', c: 'C' };
const [,, removeItem] = useRecord<string>('some-key', initialValue);

                  // record: { a: 'A', b: 'B', c: 'C' }
removeItem('b');  // record: { a: 'A', c: 'C' }
removeItem('a');  // record: { c: 'C' }
removeItem('x');  // record: { c: 'C' }
```

### Setting new record
#### Directly
You can set new record by calling `setRecord` with _newRecord_ parameter.
```typescript
const [record,,, setRecord] = useRecord<string>('some-key', { a: 'A' });

                        // record: { a: 'A' }
setRecord({ b: 'B' });  // record: { b: 'B' }
```
#### By callback
If value provided to `setRecord` is a function, it will be called with _oldValue_ parameter,
and returned value from this function will be set as new record.

With this mechanism you can resolve new value based on old value.
```typescript
const [,,, setRecord] = useRecord<string>('some-key');

const setNewRecordIfEmpty = (newRecord: Record<string, string>) => 
    setRecord((oldRecord: Record<string, string>) => {
        return (Object.keys(oldRecord).length > 0) ? oldRecord : newRecord;
    }
);
                                  // record: {}
setNewRecordIfEmpty({ b: 'B' });  // record: { b: 'B' }
setNewRecordIfEmpty({ c: 'C' });  // record: { b: 'B' }
```
