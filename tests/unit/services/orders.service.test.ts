// Bibliotecas
import { expect } from 'chai';
import sinon from 'sinon';

// Mocks
import * as mock from '../../mocks/exporter'

// Model
import { orderModel, productModel, db } from '../../../src/database/models/exporter'

// Camada service a ser testada
import { orderService } from '../../../src/service/exporter'

describe('Sequência de testes sobre a camada service responsável pelas ordens', function () {
  beforeEach(function () { sinon.restore(); });

  it('Verifica se ao requisitar todas as orders o valor recebido é correto', async function () {
    const fakeModel = orderModel.bulkBuild(
      mock.orders.ORDER,
      { include: { model: productModel, as: 'productIds', attributes: ['id'] } }
    );

    const fakeMethod = sinon.stub(orderModel, 'findAll').resolves(fakeModel);

    const allOrders = await orderService.getAll();

    sinon.assert.calledOnce(fakeMethod);
    expect(allOrders).to.be.deep.equal(mock.orders.ORDER_RETURN)
  });

  it('verifica se a camada cadastra corretamente o produto', async function () {
    const fakeOrderModel = orderModel.build({ 
      id: mock.orders.NEW_ORDER.id,
      userId: mock.orders.NEW_ORDER.userId,
    });

    const fakeOrderMethod = sinon.stub(orderModel, 'create').resolves(fakeOrderModel);
    const fakeProductMethod = sinon.stub(productModel, 'update').resolves([2]);

    const success = await orderService.postOrder(mock.orders.NEW_ORDER);

    sinon.assert.calledOnce(fakeOrderMethod);
    sinon.assert.calledOnce(fakeProductMethod);
    expect(success).to.be.deep.equal(mock.orders.SUCCESS_ORDER_REGISTER);
  });
});
