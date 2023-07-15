import { NextFunction, Request, Response } from 'express';
import { ErrorType } from '../types/exporter';

function errorMid(
  error: ErrorType,
  __request: Request,
  response: Response,
  __next: NextFunction,
): Response { return response.status(error.http).send({ message: error.message }); }

export default errorMid;