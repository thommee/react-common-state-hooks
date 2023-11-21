#### About the library
`react-generic-state-hooks` provides a simple way to create reusable data sources.
The library allows you to create generic hooks for managing application data.

#### Generic hooks
Generic hooks have the ability to store and return data and are fully reusable.<br/>
It means that data stored in them is persisted during the app's lifecycle.<br/>
Additionally, the persistence time is configurable, and depends on the storage type used.

#### Types of generic hooks

* `useValue` - basic hook with a simple API for reading and storing values
* `useList` - hook with specialized API dedicated to use with lists and sets
* `useRecord` - hook with specialized API for managing record-like data structures

#### Data storages
You can choose the storage engine in which data will be stored. <br/>Available storages:

* `inMemory` - application's memory
* `localStorage` - web browser's local storage
* `sessionStorage` - web browser's session storage
* `redux` - Redux library (`react-redux` needs to be installed to use Redux as a storage)
