export function removeElementFromArray<T>(list: T[], element: T, elementsEqual: (a: T, b: T) => boolean = (a: T, b: T) => a === b): void {
  let index: number = -1;
  list.find((value: T, i: number) => {
    if (elementsEqual(value, element)) {
      index = i;
      return true;
    }
    return false;
  })

  if (index > -1){
    list.splice(index, 1);
  }
}
