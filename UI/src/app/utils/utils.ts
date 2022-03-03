import { KeyWrapper } from './models/key-wrapper';

export function removeValueFromArray<T>(
  list: T[],
  value: T,
  valueEquals: (a: T, b: T) => boolean = (a: T, b: T) => a === b
): void {
  let index = -1;
  list.find((listValue: T, i: number) => {
    if (valueEquals(listValue, value)) {
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
    (list1Element: T) =>
      list2.find((list2Element: T) =>
        elementEqual(list1Element, list2Element)
      ) === undefined
  );
}

export function getKeyValue(
  value: any | undefined | null
): KeyWrapper | undefined {
  if (value.refactoringApproachId !== undefined) {
    return { key: value.refactoringApproachId, secondKey: undefined };
  } else if (value.approachSourceId !== undefined) {
    return { key: value.approachSourceId, secondKey: undefined };
  } else if (value.approachProcessId !== undefined) {
    return { key: value.approachProcessId, secondKey: undefined };
  } else if (value.approachOutputId !== undefined) {
    return { key: value.approachOutputId, secondKey: undefined };
  } else if (value.approachUsabilityId !== undefined) {
    return { key: value.approachUsabilityId, secondKey: undefined };
  } else if (value.name !== undefined) {
    if (value.language !== undefined) {
      return {
        key: value.name.toLowerCase(),
        secondKey: value.language.toLowerCase()
      };
    }
    return { key: value.name.toLowerCase(), secondKey: undefined };
  } else {
    return undefined;
  }
}

export function keyEquals(
  value1: unknown | undefined | null,
  value2: unknown | undefined | null
): boolean {
  const keyValue1 = getKeyValue(value1);
  const keyValue2 = getKeyValue(value2);

  if (keyValue1 === undefined || keyValue2 === undefined)
    return value1 === value2;

  return (
    keyValue1.key === keyValue2.key &&
    keyValue1.secondKey === keyValue2.secondKey
  );
}

export function copy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
