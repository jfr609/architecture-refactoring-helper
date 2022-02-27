import { KeyWrapper } from './models/key-wrapper';

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
  list2: T[] | undefined | null
): T[] {
  return findArrayDifferenceWithCustomEquals(list1, list2, keyEquals);
}

export function findArrayDifferenceWithCustomEquals<T>(
  list1: T[] | undefined | null,
  list2: T[] | undefined | null,
  elementEqual: (a: T, b: T) => boolean = (a: T, b: T) => a === b
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
      list2.find((list2Element) => elementEqual(list1Element, list2Element)) ===
      undefined
  );
}

export function getKeyValue(
  element: any | undefined | null
): KeyWrapper | undefined {
  switch (element) {
    case element.refactoringApproachId !== undefined:
      return { key: element.refactoringApproachId, secondKey: undefined };
    case element.approachSourceId !== undefined:
      return { key: element.approachSourceId, secondKey: undefined };
    case element.approachProcessId !== undefined:
      return { key: element.approachProcessId, secondKey: undefined };
    case element.approachOutputId !== undefined:
      return { key: element.approachOutputId, secondKey: undefined };
    case element.approachUsabilityId !== undefined:
      return { key: element.approachUsabilityId, secondKey: undefined };
    case element.language !== undefined && element.name !== undefined:
      return { key: element.name, secondKey: element.language };
    case element.name !== undefined:
      return { key: element.name, secondKey: undefined };
    default:
      return undefined;
  }
}

export function keyEquals(
  element1: any | undefined | null,
  element2: any | undefined | null
): boolean {
  let element1Key = getKeyValue(element1);
  let element2Key = getKeyValue(element2);

  if (element1Key === undefined || element2Key === undefined)
    return element1 === element2;

  return element1 === element2;
}

export function copy<T>(element: T): T {
  return JSON.parse(JSON.stringify(element));
}
