import { Order } from '../types/Order';

import { orderModel, productModel } from '../database/models/exporter';

async function getAll(): Promise<Order<number[]>[]> {
  const allOrders = await orderModel.findAll(
    {
      include: { model: productModel, as: 'productIds', attributes: ['id'] },
    },
  );

  return allOrders.map(({ dataValues }) => ({
    id: dataValues.id,
    userId: dataValues.userId,
    productIds: dataValues.productIds?.map(({ id }) => (id)),
  }));
}

export default { getAll };