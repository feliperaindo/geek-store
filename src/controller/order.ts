// Types
import { NextFunction, Request, Response } from 'express';
import { ErrorType } from '../types/exporter';

// Service
import { orderService } from '../service/exporter';

async function allOrders(__request: Request, response: Response): Promise<Response> {
  const all = await orderService.getAll();
  return response.status(200).send(all);
}

async function registerOrder(
  request: Request,
  response: Response,
  next: NextFunction,
) : Promise<Response | void> {
  try {
    const success = await orderService.postOrder(request.body);
    return response.status(201).send(success);
  } catch (e) {
    const error = e as ErrorType;
    next({ error: error.message, http: 422 });
  }
}

export default { allOrders, registerOrder };