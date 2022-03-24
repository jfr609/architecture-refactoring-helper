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

// Slightly modified version of: https://gist.github.com/oriadam/396a4beaaad465ca921618f2f2444d49
// return array of [r,g,b,a] from any valid color. if failed returns undefined
export function convertColorToRGBA(color: string): number[] | undefined {
  if (color === '') return undefined;
  if (color.toLowerCase() === 'transparent') return [0, 0, 0, 0];
  if (color[0] === '#') {
    if (color.length < 7) {
      // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
      color =
        '#' +
        color[1] +
        color[1] +
        color[2] +
        color[2] +
        color[3] +
        color[3] +
        (color.length > 4 ? color[4] + color[4] : '');
    }
    return [
      parseInt(color.slice(1, 3), 16),
      parseInt(color.slice(3, 5), 16),
      parseInt(color.slice(5, 7), 16),
      color.length > 7 ? parseInt(color.slice(7, 9), 16) / 255 : 1
    ];
  }
  // Converts named colors such as "white", "black", etc.
  if (color.indexOf('rgb') === -1) {
    // intentionally use unknown tag to lower chances of css rule override with !important
    const temp_elem: HTMLElement = document.body.appendChild(
      document.createElement('fictum')
    );
    // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
    const flag = 'rgb(1, 2, 3)';
    temp_elem.style.color = flag;
    if (temp_elem.style.color !== flag)
      // color set failed - some monstrous css rule is probably taking over the color of our object
      return undefined;
    temp_elem.style.color = color;
    if (temp_elem.style.color === flag || temp_elem.style.color === '')
      // color parse failed
      return undefined;
    color = getComputedStyle(temp_elem).color;
    document.body.removeChild(temp_elem);
  }
  // Converts rgb or rgba colors
  if (color.indexOf('rgb') === 0) {
    if (color.indexOf('rgba') === -1)
      // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
      color += ',1';
    const match = color.match(/[.\d]+/g);
    return match
      ? match.map(function (colorValue: string) {
          return parseInt(colorValue);
        })
      : undefined;
  }
  return undefined;
}

export function evaluateBrightnessBasedOnRGBA(rgba: number[]): number {
  return Math.round((rgba[0] * 299 + rgba[1] * 587 + rgba[2] * 114) / 1000);
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getCoordinates(
  el: HTMLElement,
  isInMainContainer = true
): { x: number; y: number } {
  const boundingRect = el.getBoundingClientRect();
  const x = boundingRect.x + boundingRect.width / 2 + window.scrollX;
  let y = boundingRect.y + boundingRect.height / 2 + window.scrollY;
  if (isInMainContainer) y -= 96;
  return { x: x, y: y };
}
