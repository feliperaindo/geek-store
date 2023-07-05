import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Order } from '../../types/Order';

type OrderInputTableTypes = Optional<Order, 'id'>;
type OrderSequelizeModelCreator = ModelDefined<Order, OrderInputTableTypes>;
export type OrderSequelizeModel = Model<Order, OrderInputTableTypes>;

const OrderModel: OrderSequelizeModelCreator = db.define('Order', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'orders',
  timestamps: false,
  underscored: true,
});

export default OrderModel;
