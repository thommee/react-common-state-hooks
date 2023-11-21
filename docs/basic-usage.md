### Generating hooks
First, We need to create generic hooks that we can later use
directly in the application, or as a base for custom hooks.

Each storage type has its own hooks creation function:

- `createInMemoryStateHooks` for storing data in application memory
- `createLocalStorageStateHooks` for storing data in local storage
- `createSessionStorageStateHooks` for storing data in session storage
- `createReduxStateHooks` for storing data in redux

Examples:

=== "inMemory"
    ```typescript title="inMemoryStateHooks.ts"
    import { createInMemoryStateHooks } from 'react-generic-state-hooks';

    export const { useValue, useList, useRecord
    } = createInMemoryStateHooks('my-namespace');
    ```
=== "local storage"

    ```typescript title="localStorageStateHooks.ts"
    import { createLocalStorageStateHooks } from 'react-generic-state-hooks';
    
    export const { useValue, useList, useRecord
    } = createLocalStorageStateHooks('my-namespace');
    ```

=== "session storage"

    ```typescript title="sessionStorageStateHooks.ts"
    import { createSessionStorageStateHooks } from 'react-generic-state-hooks';
    
    export const { useValue, useList, useRecord
    } = createSessionStorageStateHooks('my-namespace');
    ```

=== "redux"

    ```typescript title="reduxStateHooks.ts"
    import { createReduxStateHooks } from 'react-generic-state-hooks';
    
    export const { slice, createSelector, createAction,
      useValue, useList, useRecord
    } = createReduxStateHooks('my-namespace');
    
    // --------------------------------------------------------------
    // RootReducer: Connect generated "slice.reducer" to Redux store:
    import { slice } from './ReduxGenericStateHooks';
    
    const rootReducer = combineReducers({
      [slice.name]: slice.reducer
    });
    
    export { rootReducer };
    ```
Now, you can use them in any place of your application:

```typescript title="MyComponent.tsx"
import { useValue } from './inMemoryStateHooks';

const MyComponent = () => {
  const [value, setValue] = useValue('counter', 0);
  return (
    <>
      <div>count: {value}</div>
      <button onClick={() => setValue(value + 1)}>click me</button>
    </>
  );
}
```

### Creating Custom Hooks
If you plan to use the same data in multiple places in the application,
a better approach would be to create a dedicated hooks based on generic hooks:
```typescript title="useCounter.ts"
import { useValue } from './inMemoryStateHooks';

const initialValue = 0;
export const useCounter = () => useValue('counter', initialValue);
```
Just like generic hooks, you can use them as well in any place of your application:
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
