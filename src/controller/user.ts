// Types
import { NextFunction, Request, Response } from 'express';
import { ErrorType } from '../types/exporter';

// Service
import { userService } from '../service/exporter';

async function allUsers(__request: Request, response: Response): Promise<Response> {
  const all = await userService.getAll();
  return response.status(200).send(all);
}

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

export default { allUsers, singIn };