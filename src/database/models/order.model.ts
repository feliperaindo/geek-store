import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Id, Order } from '../../types/Order';

type OrderInputTableTypes = Optional<Order<Id[]>, 'id'>;
type OrderSequelizeModelCreator = ModelDefined<Order<Id[]>, OrderInputTableTypes>;
export type OrderSequelizeModel = Model<Order<Id[]>, OrderInputTableTypes>;

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
