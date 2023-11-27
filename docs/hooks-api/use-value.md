
### Interface definition
```typescript title="useValue parameters"
interface UseValue<Value> {
  (key: string, initialValue: Value): UseValueApi<Value>
}
```
```typescript title="useValue returned values"
type UseValueApi<Value> = 
  [value: Value, setValue: SetValue<Value>]

interface SetValue<Value> {
  (value: Value): void;
  (valueFn: (oldValue: Value) => Value): void;
}
```

### Update data by new value directly
```typescript
const [value, setValue] = useValue<number>('some-key', 0);

const increment = () => setValue(value + 1);

increment();  // value: 1
increment();  // value: 2
increment();  // value: 3
```

### Update data by callback
```typescript
const [value, setValue] = useValue<number>('some-key', 0);

const increment = () => setValue((oldValue: number) => oldValue + 1);

increment();  // value: 1
increment();  // value: 2
increment();  // value: 3
```
