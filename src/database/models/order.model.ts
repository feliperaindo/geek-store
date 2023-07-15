// Bibliotecas
import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';

// Types
import { Order } from '../../types/Order';
import { Id } from '../../types/Id';

// Database
import db from './index';

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
