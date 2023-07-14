import { Router } from 'express';

import { productController } from '../controller/exporter';

const product = Router();

product.get('/', productController.allProducts);

product.post('/', productController.registerProduct);

export default product;