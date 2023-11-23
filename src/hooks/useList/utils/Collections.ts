function findIndex<T>(collection: T[], element: T, areEqual: EqualityFn<T>) {
  return collection.findIndex((it) => areEqual(it, element));
}

export type ListOptions<T> = {
  distinct?: boolean;
  skipIfExist?: boolean; // do not update e.g. move to the top
  prepend?: boolean;
  areEqual?: EqualityFn<T>;
};

const defaultAreEqual = <T>(a: T, b: T) => a === b;

export interface EqualityFn<T> {
  (t1: T, t2: T): boolean;
}
export function add<T>(collection: T[], element: T, options: ListOptions<T> = {}): T[] {
  const c = [...collection];
  const index = findIndex(c, element, options.areEqual ?? defaultAreEqual);
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

export function remove<T>(collection: T[], element: T, areEqual?: EqualityFn<T>): T[] {
  const index = findIndex(collection, element, areEqual ?? defaultAreEqual);
  if (index >= 0) {
    const c = [...collection];
    c.splice(index, 1);
    return c;
  }
  return collection;
}
