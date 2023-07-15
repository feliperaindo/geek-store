// Types
import { Login, NameOrPrice, Order, Product } from '../types/exporter';

// utils
import utils from './exporter';

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

export function orderFields(fields: Order<number[]>) : void {
  ['userId', 'productIds'].forEach((field) => {
    if (!helpers.keyChecker(fields, field)) {
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

export function validateUserId(userId: unknown) : void {
  if (!helpers.numberChecker(userId)) {
    throw new Error('"userId" must be a number');
  }
}

export function validadeProductIds(productIds: unknown) : void {
  if (!helpers.arrayChecker(productIds)) {
    throw new Error('"productIds" must be an array');
  }

  if (!helpers.isEmpty(productIds as [])) {
    throw new Error('"productIds" must include only numbers');
  }
}

export function validateToken(token: string | undefined) : void {
  if (!token) {
    throw new Error('Token not found');
  }

  const tokenHash = token.split(/Bearer /)[1];
  
  try {
    utils.jwt.tokenValidator(tokenHash);
  } catch (e) {
    throw new Error('Invalid token');
  }
}
