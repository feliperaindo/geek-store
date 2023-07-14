import { Product, SuccessPost } from '../types/Product';
import { ProductSequelizeModel } from '../database/models/product.model';

import { productModel } from '../database/models/exporter';

async function getAll(): Promise<ProductSequelizeModel[]> {
  return productModel.findAll();
}

async function postProduct(info: Product): Promise<SuccessPost> {
  const { dataValues } = await productModel.create({ ...info });
  return { id: dataValues.id, name: info.name, price: info.price };
}

export default { getAll, postProduct };