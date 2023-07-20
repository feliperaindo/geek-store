// Bibliotecas
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import { describe, test } from 'mocha';

// Aplicação a ser testada
import app from '../../../src/app';

// Model
import { orderModel, productModel } from '../../../src/database/models/exporter';

// Mocks
import * as mocks from '../../mocks/exporter';

// Configuração
chai.use(chaiHttp);
chai.use(sinonChai);

describe('Sequência de testes sobre a rota /orders usando o método GET', function () {
  beforeEach(function () { sinon.restore(); });

  test('Verifica se a rota retorna corretamente as ordens cadastradas', async function () {
    const fakeDb = orderModel.bulkBuild(
      mocks.orders.ORDER,
      {
        include: { model: productModel, as: 'productIds', attributes: ['id'] },
      },
    );
    const fakeModel = sinon.stub(orderModel, 'findAll').resolves(fakeDb);
  
    const httpResponse = await chai.request(app)
      .get('/orders')
      .send(mocks.products.PRODUCT_1);

    expect(fakeModel).to.have.been.calledOnce;
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(mocks.orders.ORDER_RETURN);
  });
});
