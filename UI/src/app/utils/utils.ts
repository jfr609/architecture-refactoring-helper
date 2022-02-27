export function removeElementFromArray<T>(
  list: T[],
  element: T,
  elementsEqual: (a: T, b: T) => boolean = (a: T, b: T) => a === b
): void {
  let index: number = -1;
  list.find((value: T, i: number) => {
    if (elementsEqual(value, element)) {
      index = i;
      return true;
    }
    return false;
  });

  if (index > -1) {
    list.splice(index, 1);
  }
}

export function findArrayDifference<T>(
  list1: T[] | undefined | null,
  list2: T[] | undefined | null,
  elementsEqual: (a: T, b: T) => boolean = (a: T, b: T) => a === b
): T[] {
  if (list1 == null || list1.length === 0) {
    if (list2 == null) {
      return [];
    }
    return list2;
  }
  if (list2 == null || list2.length === 0) {
    return list1;
  }

  return list1.filter(
    (list1Element) =>
      list2.find((list2Element) =>
        elementsEqual(list1Element, list2Element)
      ) === undefined
  );
}

export function copy<T>(element: T): T {
  return JSON.parse(JSON.stringify(element));
}
