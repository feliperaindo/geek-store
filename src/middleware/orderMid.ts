// Types
import { NextFunction, Request, Response } from 'express';
import { ErrorType } from '../types/Error';

// utils
import * as utils from '../utils/validator';

export function validateToken(request: Request, __response: Response, next: NextFunction) : void {
  try {
    utils.validateToken(request.headers.authorization);
    next();
  } catch (e) {
    const error = e as ErrorType;
    next({ message: error.message, http: 401 });
  }
}

export function orderFieldMid(__request: Request, __response: Response, next: NextFunction) : void {
  try {
    console.log('passei aqui');
    next();
  } catch (e) {
    const error = e as ErrorType;
    next({ message: error.message, http: 400 });
  }
}

export function orderInfoMid(__request: Request, __response: Response, next: NextFunction) : void {
  try {
    console.log('passei aqui');
    next();
  } catch (e) {
    const error = e as ErrorType;
    next({ message: error.message, http: 422 });
  }
}