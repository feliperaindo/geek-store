import { Login } from '../types/exporter';

export function keyChecker(obj: Login, key: string) : boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function isEmpty(value: string) : boolean {
  const empty = 0;
  return value.length > empty;
}
