function findIndex<T>(collection: T[], element: T, areEqual: AreListItemsEqual) {
  return collection.findIndex((it) => areEqual(it, element));
}

export type ListOptions = {
  distinct?: boolean;
  skipIfExist?: boolean; // do not update e.g. move to the top
  prepend?: boolean;
};

export type AreListItemsEqual = <T>(t1: T, t2: T) => boolean;
export function inPlaceAdd<T>(
  collection: T[],
  element: T,
  areEqual: AreListItemsEqual,
  options: ListOptions = {},
): T[] {
  const index = findIndex(collection, element, areEqual);
  const exist = index >= 0;

  if (!exist) {
    collection[options.prepend ? 'unshift' : 'push'](element);
    return collection;
  }

  if (options.skipIfExist) {
    return collection;
  }

  if (options.distinct) {
    collection.splice(index, 1);
  }

  collection[options.prepend ? 'unshift' : 'push'](element);
  return collection;
}

export function inPlaceRemove<T>(collection: T[], element: T, areEqual: AreListItemsEqual): T[] {
  const index = findIndex(collection, element, areEqual);
  if (index >= 0) {
    collection.splice(index, 1);
  }
  return collection;
}
