// Types
import { NextFunction, Request, Response } from 'express';
import { ErrorType } from '../types/exporter';

// utils
import loginFields from '../utils/validator';

function loginMid(request: Request, __response: Response, next: NextFunction): void {
  try {
    loginFields(request.body);
    next();
  } catch (e) {
    const error = e as ErrorType;
    next({ message: error.message, http: 400 });
  }
}

export default loginMid;