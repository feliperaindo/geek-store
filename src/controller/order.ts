// Types
import { Request, Response } from 'express';

// Service
import { orderService } from '../service/exporter';

async function allOrders(__request: Request, response: Response): Promise<Response> {
  const all = await orderService.getAll();
  return response.status(200).send(all);
}

export default { allOrders };