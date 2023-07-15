// Biblioteca
import { Router } from 'express';

// Middleware
import { productMid, errorMid } from '../middleware/exporter';

// Controller
import { productController } from '../controller/exporter';

const product = Router();

product.get('/', productController.allProducts);

product.use([productMid.productFieldsMid, productMid.productsInfoMid]);

product.post('/', productController.registerProduct);

product.use(errorMid);

export default product;