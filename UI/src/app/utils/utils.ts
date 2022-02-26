export function removeElementFromArray<T>(list: T[], element: T, elementsEqual: (a: T, b: T) => boolean = (a: T, b: T) => a === b): void {
  let index: number = -1;
  list.find((value: T, i: number) => {
    if (elementsEqual(value, element)) {
      index = i;
      return true;
    }
    return false;
  })

  if (index > -1) {
    list.splice(index, 1);
  }
}

export function findArrayDifference<T>(list1: T[], list2: T[], elementsEqual: (a: T, b: T) => boolean = (a: T, b: T) => a === b): T[] {
  return list1.filter(list1Element => list2.find(list2Element => elementsEqual(list1Element, list2Element)) === undefined);
}

export function copy<T>(element: T): T {
  return JSON.parse(JSON.stringify(element));
}
