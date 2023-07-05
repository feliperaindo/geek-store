import { productService } from '../../service/exporter';

async function registerProduct(request: any, response: any): Promise<void | any> {
  const successRegister = await productService.post(request.body);
  return response.status(201).send(successRegister);
}

export default registerProduct;