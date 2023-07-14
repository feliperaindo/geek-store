import { Router } from 'express';

import { orderController } from '../controller/exporter';

const order = Router();

order.get('/', orderController.allOrders);

export default order;