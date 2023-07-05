import { productModel } from '../../database/models/exporter';

import { Product } from '../../types/Product';

async function postProduct(info: Product): Promise<any> {
  const test = await productModel.create({ ...info });
  console.log(test);
  
  return 3;
}

export default postProduct;