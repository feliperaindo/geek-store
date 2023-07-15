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

export function isEmpty(value: string) : boolean {
  const empty = 0;
  return value.length > empty;
}
