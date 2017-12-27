import { evolve, head, tail } from 'ramda';

export function isFunction(val) {
  return typeof val === 'function';
}

function buildTreeFromPath(path, val) {
  if (path.length === 0) {
    return val;
  }

  return {
    [head(path)]: buildTreeFromPath(tail(path), val)
  };
}

// This is a function that ramda is lacking, it's basically evolve for single property,
// where path is an array of prop names, allowing more concise calls
export function evolvePath(path, fn, obj) {
  return evolve(buildTreeFromPath(path, fn), obj);
}