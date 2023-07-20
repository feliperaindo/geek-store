// Bibliotecas
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import { describe, test } from 'mocha';

// Aplicação a ser testada
import app from '../../../src/app';

// Model
import { orderModel, productModel, userModel } from '../../../src/database/models/exporter';

// Mocks
import * as mocks from '../../mocks/exporter';

// Configuração
chai.use(chaiHttp);
chai.use(sinonChai);

describe('Sequência de testes sobre a rota /orders usando o método POST', function () {
  const validToken = 'valid token';

  beforeEach(function () { sinon.restore(); });
  

  describe('Sequência de testes para casos de sucesso', function () {
    beforeEach(function () { sinon.restore(); });

    test('Verifica se a rota retorna corretamente a ordem cadastrada', async function () {

      const fakeDb = orderModel.build({ 
        id: mocks.orders.NEW_ORDER.id,
        userId: mocks.orders.NEW_ORDER.userId,
      });

      const fakeUserDb = userModel.build(mocks.users.USER_1);

      const fakeProductModel = sinon.stub(productModel, 'update').resolves();
      const fakeOrderModel = sinon.stub(orderModel, 'create').resolves(fakeDb);
      const fakeUserModel = sinon.stub(userModel, 'findByPk').resolves(fakeUserDb);

      const fakeJWT = sinon.stub(jwt, 'verify').resolves(true);
  
      const httpResponse = await chai.request(app)
        .post('/orders')
        .set({ Authorization: `Bearer ${validToken}` })
        .send(mocks.orders.NEW_ORDER);
  
      expect(fakeJWT).to.have.been.calledOnce
      expect(fakeJWT).to.have.been.calledWith(validToken);

      expect(fakeUserModel).to.have.been.calledOnce;
      expect(fakeUserModel).to.have.been.calledWith(mocks.orders.NEW_ORDER.userId);

      expect(fakeOrderModel).to.have.been.calledOnce;
      expect(fakeOrderModel).to.have.been.calledWith({ userId: mocks.orders.NEW_ORDER.userId });

      expect(fakeProductModel).to.have.been.calledOnce;
      expect(fakeProductModel).to.have.been.calledWith({ orderId: mocks.orders.NEW_ORDER.id });

      expect(httpResponse.status).to.be.equal(201);
      expect(httpResponse.body).to.be.deep.equal(mocks.orders.SUCCESS_ORDER_REGISTER);
    });
  })

  describe('Sequência de testes para casos de falha', function () {
    beforeEach(function () { sinon.restore(); });

    test('Verifica se é retorna um status de erro caso não encontre o campo "authorization"', async function () {
      const httpResponse = await chai.request(app)
        .post('/orders')
        .send(mocks.orders.NEW_ORDER);

      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.match(/^Token not found$/);
    });

    test('Verifica se é retorna um status de erro caso passado um token inválido', async function () {
      const invalidToken = 'invalid token';

      const httpResponse = await chai.request(app)
        .post('/orders')
        .set({ Authorization: `Bearer ${invalidToken}` })
        .send(mocks.orders.NEW_ORDER);

      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.match(/^Invalid token$/);
    });

    test('Verifica se é retorna um status de erro caso faltem parâmetros obrigatórios', async function () {
      sinon.stub(jwt, 'verify').resolves(true);

      const httpResponse = await chai.request(app)
        .post('/orders')
        .set({ Authorization: `Bearer ${validToken}` })
        .send(mocks.orders.ORDER_NO_USER_ID);

      expect(httpResponse.status).to.be.equal(400);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.match(mocks.constants.ORDER_USER_ID_ERROR_MESSAGE);
    });

    test('Verifica se é retorna um status de erro caso algum parâmetro esteja incorreto', async function () {
      sinon.stub(jwt, 'verify').resolves(true);

      const httpResponse = await chai.request(app)
        .post('/orders')
        .set({ Authorization: `Bearer ${validToken}` })
        .send(mocks.orders.ORDER_INCORRECT);

      expect(httpResponse.status).to.be.equal(422);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.match(/^"userId" must be a number$/);
    });

    test('Verifica se é retorna um status de erro caso o userId não seja encontrado', async function () {
      sinon.stub(jwt, 'verify').resolves(true);
      sinon.stub(userModel, 'findByPk').resolves(null);

      const httpResponse = await chai.request(app)
        .post('/orders')
        .set({ Authorization: `Bearer ${validToken}` })
        .send(mocks.orders.NEW_ORDER);

      expect(httpResponse.status).to.be.equal(404);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.match(/^"userId" not found$/);
    });
  });
});
