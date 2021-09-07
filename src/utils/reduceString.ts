export function reduceWithCustomDelimeter(arr: string[], delimeter: string): string {
  return arr.reduce<string>((result, next, i) => {
    let prefix = delimeter;
    if (i === 0) prefix = "";
    return result + prefix + next;
  }, "" as string);
}

/** Аррей строк => строка с перечислением элементов через азпятую */
export function reduceWithCommas(arr: string[]): string {
  return reduceWithCustomDelimeter(arr, ", ");
}

export function reduceWithSlashes(arr: string[]): string {
  return reduceWithCustomDelimeter(arr, " / ");
}
