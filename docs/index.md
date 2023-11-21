#### About the library
`react-generic-state-hooks` provide a simple way for creating reusable data sources.
The library allows you to create generic hooks for managing application data.

#### Generic hooks
Generic hooks have ability to store and return data and are fully reusable.<br/>
It means that data stored in them is persisted during app lifecycle.<br/>
Additionally, persistence time is configurable, and is depending on the storage type used.

#### Types of generic hooks

* `useValue`  basic hook with simple api for reading and storing values
* `useList`  hook with specialized api dedicated to use with list and sets
* `useRecord`  hook with specialized api for managing record-like data structures

#### Data storages
You can choose storage engine within data will be stored. <br/>Available storages:

* `inMemory`  application's memory
* `localStorage`  web browser's local storage
* `sessionStorage`  web browser's session storage
* `redux`  Redux library (`react-redux` needs to be installed to use redux as a storage)

