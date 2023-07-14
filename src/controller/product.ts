import { Request, Response } from 'express';

import { productService } from '../service/exporter';

async function allProducts(__request: Request, response: Response): Promise<Response> {
  const all = productService.getAll();
  return response.status(200).send(all);
}

async function registerProduct(request: Request, response: Response): Promise<Response> {
  const successRegister = await productService.postProduct(request.body);
  return response.status(201).send(successRegister);
}

export default { allProducts, registerProduct };