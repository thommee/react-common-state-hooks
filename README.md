## react-generic-state-hooks
### Generic State Hooks for React

#### About the library
`react-generic-state-hooks` has been created to provide a simple way for creating reusable data sources
ready for use anywhere in the application.
The library allows you to define hooks for reading and modifying **the same** data, regardless of where it is used.

### [Docs, tutorials and examples can be found here.](https://thommee.github.io/react-generic-state-hooks/)

## Quick guide
### Installation
`npm install react-generic-state-hooks`

### Basic usage:

~~~typescript jsx
// inMemoryStateHooks.ts
import { createInMemoryStateHooks } from 'react-generic-state-hooks';

export const { useValue, useList, useRecord
} = createInMemoryStateHooks('my-namespace');
~~~
 Now, you can use generic hooks in any place of your application:

~~~typescript jsx
// MyComponent.tsx
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
~~~

### Creating Custom Hooks
If you plan to use the same data in multiple places in the application, 
a better approach would be to create a dedicated hooks based on generic hooks:
~~~typescript jsx
// useCounter.ts
import { useValue } from './inMemoryStateHooks';
export const useCounter = () => useValue('counter', 0);
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

##### [Click here for full documentation](https://thommee.github.io/react-generic-state-hooks/)

