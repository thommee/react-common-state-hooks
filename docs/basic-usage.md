### Generating hooks
First, we need to create generic hooks that we can later use
directly in the application or as a base for custom hooks.

#### Hooks creation function types

For creating generic hooks we can use four functions.<br/>
Each of them stores data in different type of storage:

- `createInMemoryStateHooks` stores data in the application memory
- `createLocalStorageStateHooks` stores data in local storage
- `createSessionStorageStateHooks` stores data in session storage
- `createReduxStateHooks` stores data in Redux

##### Usage examples

=== "InMemory"
    ```typescript title="inMemoryStateHooks.ts"
    import { createInMemoryStateHooks } from 'react-generic-state-hooks';

    export const { useValue, useList, useRecord
    } = createInMemoryStateHooks('my-namespace');
    ```
=== "LocalStorage"

    ```typescript title="localStorageStateHooks.ts"
    import { createLocalStorageStateHooks } from 'react-generic-state-hooks';
    
    export const { useValue, useList, useRecord
    } = createLocalStorageStateHooks('my-namespace');
    ```

=== "SessionStorage"

    ```typescript title="sessionStorageStateHooks.ts"
    import { createSessionStorageStateHooks } from 'react-generic-state-hooks';
    
    export const { useValue, useList, useRecord
    } = createSessionStorageStateHooks('my-namespace');
    ```

=== "Redux"

    ```typescript title="reduxStateHooks.ts"
    import { createReduxStateHooks } from 'react-generic-state-hooks';
    
    export const { slice, createSelector, createAction,
      useValue, useList, useRecord
    } = createReduxStateHooks('my-namespace');
    ```
    ```typescript title="rootReducer.ts"
    // Connect generated "slice.reducer" to Redux store:
    import { slice } from './ReduxGenericStateHooks';
    
    const rootReducer = combineReducers({
      [slice.name]: slice.reducer
    });
    
    export { rootReducer };
    ```
Now, you can use them anywhere in your application:

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
a better approach would be to create dedicated hooks based on generic hooks.

#### Custon hook example

```typescript title="useCounter.ts"
import { useValue } from './inMemoryStateHooks';

const initialValue = 0;
export const useCounter = () => useValue('counter', initialValue);
```
Just like generic hooks, you can use custom hooks anywhere in your application:
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
