import { DataTypes, Model, QueryInterface } from 'sequelize';
import { Order } from '../../types/Order';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Order<undefined>>>('orders', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('orders');
  }
};
