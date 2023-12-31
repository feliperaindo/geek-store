// Types
import { Request, Response } from 'express';

// Service
import { productService } from '../service/exporter';

async function allProducts(__request: Request, response: Response): Promise<Response> {
  const all = await productService.getAll();  
  return response.status(200).send(all);
}

async function registerProduct(request: Request, response: Response): Promise<Response> {
  const successRegister = await productService.postProduct(request.body);
  return response.status(201).send(successRegister);
}

export default { allProducts, registerProduct };