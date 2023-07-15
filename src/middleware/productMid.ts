// Types
import { NextFunction, Request, Response } from 'express';
import { ErrorType } from '../types/exporter';

// utils
import * as utils from '../utils/validator';

export function productFieldsMid(
  request: Request,
  __response: Response,
  next: NextFunction,
) : void {
  try {
    utils.productFields(request.body);
    next();
  } catch (e) {
    const error = e as ErrorType;
    next({ message: error.message, http: 400 });
  }
}

export function productsInfoMid(request: Request, __response: Response, next: NextFunction) : void {
  try {
    utils.validateNameAndPrice(request.body.name, 'name');
    utils.validateNameAndPrice(request.body.price, 'price');
    next();
  } catch (e) {
    const error = e as ErrorType;
    next({ message: error.message, http: 422 });
  }
}