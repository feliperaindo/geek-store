// Types
import { NextFunction, Request, Response } from 'express';
import { ErrorType } from '../types/exporter';

// Service
import { userService } from '../service/exporter';

async function singIn(
  request: Request, 
  response: Response, 
  next: NextFunction,
): Promise<Response | void> {
  try {
    const token = await userService.verifyUser(request.body);
    return response.status(200).send(token);
  } catch (e) {
    const error = e as ErrorType;
    next({ message: error.message, http: 401 });
  }
}

export default { singIn };