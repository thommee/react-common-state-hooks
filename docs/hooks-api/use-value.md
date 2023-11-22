
### Interface definition
```typescript
interface UseValue<Value> {
  (key: string, initialValue: Value): UseValueApi<Value>
}

type UseValueApi<Value> = 
  [value: Value, setValue: SetValueFn<Value>]

interface SetValueFn<T> {
  (value: T): void;
  (value: (oldValue: T) => T): void;
}
```

### Update data directly
```typescript
const [value, setValue] = useValue('some-key', 0);

const increment = useCallback(() => setValue(value + 1), [value]);
```

### Update data by callback function
In this approach we have no dependencies in `useCallback` hook.
```typescript
const [value, setValue] = useValue('some-key', 0);

const increment = useCallback(() => setValue((oldValue) => oldValue + 1), []);
```
