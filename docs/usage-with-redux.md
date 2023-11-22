### Creating Generic Hooks
`createReduxStateHooks()` returns generic hooks, `slice` (reducer and its name), 
`createSelector` and `createAction` helpers to work with Redux.

```typescript title="myNamespaceReduxGenericHooks.ts"
import { createReduxStateHooks } from 'react-generic-state-hooks';

export const {
  useValue, useList, useRecord, 
  slice, createSelector, createAction  
} = createReduxStateHooks('my-namespace');
```

### Connecting to redux
Generated `slice` object contains two properties: `name` - the key for connecting reducer to rootReducer, 
and `reducer` - reducer itself.
```typescript title="rootReducer.ts"
import { slice } from './myNamespaceReduxGenericHooks.ts';

const rootReducer = combineReducers({
  [slice.name]: slice.reducer,
  // ...other reducers
});

export { rootReducer };
```

### Creating a custom hook, selector and action
There is no need to create a selector or action to use hooks with Redux.<br/>
Only if you want to manually dispatch changes or manually select value from Redux,
you will need to generate dedicated selectors and actions.

```typescript title="useCounter.ts"
import { useValue, createSelector, createAction
} from './myNamespaceReduxGenericHooks.ts';

const key = 'counter';
const initialValue = 0;

export const useCounter = () => useValue(key, initialValue);
export const selectCounter = createSelector(key, initialValue);
export const setCounter = createAction(key);
```
#### Hook Usage

```jsx title="MyComponent.tsx"
import { useCounter } from './useCounter';

const MyComponent = () => {
  const [value, setValue] = useCounter();
  return (
    <>
      <div>count: {value}</div>
      <button onClick={() => setValue(value + 1)}>click me</button>
    </>
  );
}
```

#### Selector and Action Usage

```jsx title="MyComponent.tsx"
import { useSelector, useDispatch } from 'react-redux';
import { selectCounter, setCounter } from './useCounter';

const MyComponent = () => {
  const dispatch = useDispatch();  
  const value = useSelector(selectCounter);

  return (
    <>
      <div>count: {value}</div>
      <button onClick={() => dispatch(setCounter(value + 1))}>click me</button>
    </>
  );
}
```
