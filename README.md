## react-state-hooks
### Shareable State Hooks for React

#### About the library
`react-state-hooks` has been created to provide a simple way for creating reusable data sources
ready for use anywhere in the application.
The library allows you to define hooks for reading and modifying **the same** data, regardless of where it is used.

#### Types of hooks
The library provides three different types of hooks dedicated for most common used
data types like simple values, lists & sets and records (maps):
- `useGenericValue`: basic hook for reading and storing any values
- `useGenericList`: hook dedicated to use with list and sets
- `useGenericRecord`: hook for managing record-like data structures like maps and key-value storages.

#### Storing Data
`react-state-hooks` provides two types of data storages:
- `inMemory`: data is stored in the application's memory
- `redux`: data is stored in Redux (redux is not included in this library)

If you like to store data in application's memory,
you should use `createInMemoryStateHooks`. to generate hooks. 
For saving data in Redux, use `createReduxStateHooks` to generate hooks.


### Installation
`npm install react-state-hooks`

### Basic usage:
First, We need to create generic hooks that we can later use 
directly in the application, or as a base for custom hooks.

Example for `createInMemoryStateHooks`:
~~~typescript jsx
// InMemoryGenericStateHooks.ts
import { createInMemoryStateHooks } from 'react-state-hooks';

export const {
  useGenericValue,
  useGenericList,
  useGenericRecord
} = createInMemoryStateHooks('my-namespace');
~~~

Example for `createReduxStateHooks`:
~~~typescript jsx
// ReduxGenericStateHooks.ts
import { createReduxStateHooks } from 'react-state-hooks';

export const {
  slice,
  useGenericValue,
  useGenericList,
  useGenericRecord
} = createReduxStateHooks('my-namespace');

// We need to conect generated slice.reducer to Redux store.
// RootReducer.ts
import { slice } from './ReduxGenericStateHooks';

// ...
const rootReducer = combineReducers({
  // ...
  [slice.name]: slice.reducer
  // ...
});

export { rootReducer };
~~~
That's all! Now, you can use generic hooks in any place of your application:

~~~typescript jsx
// MyComponent.tsx
import { useGenericValue } from './inMemoryStateHooks';

const MyComponent = () => {
  const [value, setValue] = useGenericValue('counter', 0);
  return (
    <>
      <div>count: {value}</div>
      <button onClick={() => setValue(value+1)}>click me</button>
    </>
  );
}
~~~

### Creating Custom Hooks
If you plan to use the same data in multiple places in the application, 
a better approach would be to create a dedicated custom hook (and encapsulate its configuration in one place):
~~~typescript jsx
// useCounter.ts
import { useGenericValue } from './inMemoryGenericStateHooks';

export const useCounter = (initialValue: number = 0) => useGenericValue('counter', initialValue);
~~~
Hooks created this way can be used just like generic hooks, in any place of your application:
~~~typescript jsx
// MyComponent.tsx
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
~~~
