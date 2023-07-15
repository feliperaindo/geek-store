export function keyChecker<T>(obj: T, key: string) : boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function stringChecker(value: unknown) : boolean {
  return typeof value === 'string';
}

export function stringLengthChecker(value: string) : boolean {
  const minLength = 2;
  return value.length > minLength;
}

export function numberChecker(value: unknown) : boolean {
  return typeof value === 'number';
}

export function arrayChecker(value: unknown) : boolean {
  return Array.isArray(value);
}

export function isEmpty(value: string | []) : boolean {
  const empty = 0;
  return value.length > empty;
}
