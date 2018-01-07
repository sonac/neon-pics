import { evolve, head, tail } from 'ramda';

function buildTreeFromPath<T>(path: string[], val: T): object | T {
  return path.length === 0
    ? val
    : { [head(path)]: buildTreeFromPath(tail(path), val) };
}

// This is a function that ramda is lacking, it's basically evolve for single property,
// where path is an array of prop names, allowing more concise calls
export function evolvePath(path: string[], fn: <T>(val: T) => T, obj: object): object {
  return evolve(buildTreeFromPath(path, fn), obj);
}

export function pairwise<T>(arr: T[]): [T, T][] {
  if (arr.length < 2) {
    return [];
  }

  const x = head(arr),
        xs  = tail(arr),
        pairs = xs.map((_: T): [T, T] => [x, _]);

  return pairs.concat(pairwise(xs));
}
