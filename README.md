## react-generic-state-hooks
### Generic State Hooks for React

#### About the library
`react-generic-state-hooks` has been created to provide a simple way for creating reusable data sources
ready for use anywhere in your application.
The library allows you to define hooks for reading and modifying **the same** data, regardless of where it is used.

With that, you'll be able to calmly create your application and enjoy the creative process.
It's all about making development smoother and more enjoyable.

If you choose redux-way for creating hooks, you'll never have to create actions and reducers again.
It will all be done for you.

#### Types of hooks
The library provides three different types of hooks dedicated for most common used
data types like simple values, lists & sets and records (maps):
- `useGenericValue`: basic hook for reading and storing any values
- `useGenericList`: hook dedicated to use with list and sets
- `useGenericRecord`: hook for managing record-like data structures like maps and key-value storages.

#### Storing Data
`react-generic-state-hooks` provides three types of data storages:
- `inMemory`: data is stored in application's memory
- `localStorage`: data is stored in local storage
- `redux`: data is stored in Redux (not included in this library)

### Installation
`npm install react-generic-state-hooks`

### Basic usage:
First, We need to create generic hooks that we can later use 
directly in your application, or as a base for custom hooks.

#### Hooks creators:
- `createInMemoryStateHooks` for storing data in application memory
- `createLocalStorageStateHooks` for storing data in local storage
- `createReduxStateHooks` for storing data in redux

Examples:
~~~typescript jsx
// inMemoryStateHooks.ts
import { createInMemoryStateHooks } from 'react-generic-state-hooks';

export const {
  useGenericValue,
  useGenericList,
  useGenericRecord
} = createInMemoryStateHooks('my-namespace');
~~~
~~~typescript jsx
// localStorageStateHooks.ts
import { createInMemoryStateHooks } from 'react-generic-state-hooks';

export const {
  useGenericValue,
  useGenericList,
  useGenericRecord
} = createInMemoryStateHooks('my-namespace');
~~~
~~~typescript jsx
// reduxStateHooks.ts
import { createReduxStateHooks } from 'react-generic-state-hooks';

export const {
  slice,
  createSelector,
  createAction,  
  useGenericValue,
  useGenericList,
  useGenericRecord
} = createReduxStateHooks('my-namespace');

// ---------------------------------------------------------
// RootReducer.ts
// We need to connect generated "slice.reducer" to Redux store.
import { slice } from './reduxStateHooks';

const rootReducer = combineReducers({
  [slice.name]: slice.reducer
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
      <button onClick={() => setValue(value + 1)}>click me</button>
    </>
  );
}
~~~

### Creating Custom Hooks
If you plan to use the same data in multiple places in your application, 
a better approach would be to create a dedicated hooks based on generic hooks:
~~~typescript jsx
// useCounter.ts
import { useGenericValue } from './inMemoryStateHooks';

export const useCounter = (initialValue: number = 0) => useGenericValue('counter', initialValue);
~~~
Just like generic hooks, you can use them in any place of your application:
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

### Values returned by hooks
~~~typescript jsx
const [value, setValue] = useGenericValue('myValue', 0);
const [list, addItem, removeItem, setList] = useGenericList('myList', []);
const [record, addItem, removeItem, setRecord] = useGenericRecord('myRecord', {});
~~~
