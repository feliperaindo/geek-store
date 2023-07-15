// Types
import { Order } from '../types/exporter';

// Models
import { orderModel, productModel, db } from '../database/models/exporter';

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

async function postOrder({ userId, productIds }: Order<number[]>) : Promise<Order<number[]>> {
  return db.transaction(async (newOrder) => {
    const { dataValues } = await orderModel.create({ userId }, { transaction: newOrder });

    await productModel.update(
      { orderId: dataValues.id },
      { where: { id: productIds }, transaction: newOrder },
    );

    return { userId, productIds };
  });
}

export default { getAll, postOrder };