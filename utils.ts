export function flatten<T = string>(arr: any, depth: number = 1): T[] {
  return depth > 0
    ? arr.reduce(
        (acc: T[], val: T) =>
          acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val),
        [],
      )
    : arr;
}
