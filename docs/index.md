React Generic State Hooks provides a unified, consistent API for reading and writing data.
With dedicated hooks for key data types, you have full control over how your data is managed.

It supports the most essential types of storages: inMemory, localStorage, sessionStorage, redux.
Additionally, the data stored in them persists throughout the application's runtime,
so you can reuse them in any place of your application with the same data.

If you use it with Redux, you no longer need to manually create actions and reducers.<br/> 
Everything will be handled for you.

### Types of hooks
* `useValue` - basic hook with a simple API for reading and storing values
* `useRecord` - hook with specialized API for managing record-like data structures
* `useList` - hook with specialized API dedicated to use with lists and sets

### Data storages
You can choose the storage engine within data will be stored:

* `inMemory` - application memory
* `localStorage` - web browser local storage
* `sessionStorage` - web browser session storage
* `redux` - redux library

### 

