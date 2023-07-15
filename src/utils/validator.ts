// Types
import { Login, NameOrPrice, Product } from '../types/exporter';

// helpers
import * as helpers from '../helpers/checkers';

export function loginFields(fields: Login) : void {
  type KeyFields = keyof typeof fields;

  ['username', 'password'].forEach((field) => {
    if (!helpers.keyChecker<Login>(fields, field) || !helpers.isEmpty(fields[field as KeyFields])) {
      throw new Error('"username" and "password" are required');
    }
  });
}

export function productFields(fields: Product) : void {
  ['name', 'price'].forEach((field) => {
    if (!helpers.keyChecker<Product>(fields, field)) {
      throw new Error(`"${field}" is required`);
    }
  });
}

export function validateNameAndPrice(data: unknown, field: NameOrPrice) : void {
  if (!helpers.stringChecker(data)) {
    throw new Error(`"${field}" must be a string`);
  }

  if (!helpers.stringLengthChecker(data as string)) {
    throw new Error(`"${field}" length must be at least 3 characters long`);
  }
}
