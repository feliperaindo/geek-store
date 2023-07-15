// Biblioteca
import { Router } from 'express';

// middleware
import * as middleware from '../middleware/exporter';

// Controller
import { orderController } from '../controller/exporter';

const order = Router();

order.get('/', orderController.allOrders);

order.use([
  middleware.orderMid.validateToken,
  middleware.orderMid.orderFieldMid,
  middleware.orderMid.orderInfoMid,
]);

order.post('/', orderController.registerOrder);

order.use(middleware.errorMid);

export default order;