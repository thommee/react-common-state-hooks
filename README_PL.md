## react-state-hooks
### shareable state hooks for react

#### Motywcja
react-state-hooks powstała, by dostarczyć prosty sposób na tworzenie
źródeł danych, gotowych do użycia w dowolnym miejscu aplikacji.

#### O bibliotece
Biblioteka umożliwia zdefiniowanie hooków, które pozwalają na odczyt 
i zmianę **tej samej** danej, niezależnie od miejsca jego użycia.

#### Generyczne, specjalizowane hooki
Oprócz podstawowego hooka, dostępne są również hooki wyspecjalizowane do pracy ze złożonymi 
strukturami danych takimi jak listy, sety i rekordy (mapy).

Lista dostępnych hooków:
- `useGenericValue`: podstawowy hook pozwalający na zapis i odczyt danych
- `useGenericList`: hook pozwalający na zapis, odczyt i zmianę danych typu lista i set
- `useGenericRecord`: hook do obsługi danych w strukturach typu rekord, mapa; key-value storage.

#### Sposoby zapisu danych
react-state-hooks pozwala wybrać sposób w jaki dane będa przechowywane w aplikacji.

Lista dostępnych silników przechowywania danych:
- `inMemory` dane zapisywane pamięci aplikacji - nie wymaga dodatkowej konfiguracji, nie umożliwia zapisu danych na stałe 
- `redux` dane zapisywane w redux - wymaga środowiska Redux, umożlwia zapis danych na stałe (w zależności od konfiguracji redux)

##### Konfiguracja sposobu zapisu danych:
Biblioteka dostarcza dwie funkcje pozwalające na wygenerowanie hooków generycznych:
`createInMemoryStateHooks`: nie posiada żadnej dodatkowej konfiguracji. 
Wygenerowane przez nią hooki są natychmiast gotowe do działania.

`createReduxStateHooks`: wymaga podania unikalnej nazwy (namespace) dla przechowywanych danych,
oraz wpięcia wygenerowanego reducera w reduxowy Store.

react-state-hooks nie dostarcza ani nie instaluje środowiska redux.

jeśli planujesz użyć reduxowego sposobu zapisu danych,
musisz zadbać o zainstalowanie go w swojej aplikacji.


### Instalacja
``` TBD ```


### Użycie `inMemory`:
#### Sposób użycia dla przechowywania danych w pamięci aplikacji 
Utwórzmy hooki generyczne, które będziemy mogli uzyć bezpośrednio w aplikacji,
lub jako bazę dla naszych customowych hooków.
~~~typescript jsx
// inMemoryGenericStateHooks.ts
import { createInMemoryStateHooks } from 'react-state-hooks';
const { useGenericValue, useGenericList, useGenericRecord } = createInMemoryStateHooks();
export { useGenericValue, useGenericList, useGenericRecord };
~~~
To wszystko. Od teraz możesz uzywać generycznych hooków w dowolnym komponencie,
jak w przykładzie poniżej:
~~~typescript jsx
// UsageCounter.tsx
import { useGenericValue } from './inMemoryStateHooks';

const AnotherUsageCounter = () => {
  const [value, setValue] = useGenericValue('counter');
  return (
    <>
      <div>count: {value}</div>
      <button onClick={() => setValue(value)}>click me</button>
    </>
  );
}
~~~
### Tworzenie własnych hooków
Jeśli planujesz korzystanie z tych samych danych w wielu miejscachw  aplikacji
lepszym podejściem będzie utworzenie dedykowanego hooka:
~~~typescript jsx
// useCounter.ts
import { useGenericValue } from './inMemoryGenericStateHooks'
const key = 'counter';
export const useCounter = (initialValue: number = 0) => useGenericValue(key, initialValue);
~~~
Utworzone w ten sposób hooki możesz użyć, tak samo jak hooki generyczne,
w dowolnym komponencie. 

Przykład:
~~~typescript jsx
// UsageCounter.tsx
import { useCounter } from './useCounter';
const UsageCounter = () => {
  const [value, setValue] = useCounter();
  return (
    <>
      <div>count: {value}</div>
      <button onClick={() => setValue(value)}>click me</button>
    </>
  );
}
~~~

## END

