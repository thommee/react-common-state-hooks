function findIndex<T>(collection: T[], element: T, areEqual: AreListItemsEqual<T>) {
  return collection.findIndex((it) => areEqual(it, element));
}

export type ListOptions = {
  distinct?: boolean;
  skipIfExist?: boolean; // do not update e.g. move to the top
  prepend?: boolean;
};

export interface AreListItemsEqual<T> {
  (t1: T, t2: T): boolean
}
export function add<T>(
  collection: T[],
  element: T,
  areEqual: AreListItemsEqual<T>,
  options: ListOptions = {},
): T[] {
  const c = [...collection];
  const index = findIndex(c, element, areEqual);
  const exist = index >= 0;

  if (!exist) {
    c[options.prepend ? 'unshift' : 'push'](element);
    return c;
  }

  if (options.skipIfExist) {
    return collection;
  }

  if (options.distinct) {
    c.splice(index, 1);
  }

  c[options.prepend ? 'unshift' : 'push'](element);
  return c;
}

export function remove<T>(collection: T[], element: T, areEqual: AreListItemsEqual<T>): T[] {
  const index = findIndex(collection, element, areEqual);
  if (index >= 0) {
    const c = [...collection];
    c.splice(index, 1);
    return c;
  }
  return collection;
}
