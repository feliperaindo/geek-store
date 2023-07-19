// Bibliotecas
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';

// Types
import { NextFunction, Request, Response } from 'express';
import { ErrorType } from '../../../src/types/exporter';

// Mocks
import * as mocks from '../../mocks/exporter';

// Service
import { orderService, userService } from '../../../src/service/exporter';

// Camada controller a ser testada
import { orderController } from '../../../src/controller/exporter';

// Configuração
chai.use(sinonChai);

describe('Sequência de testes sobre a camada controller responsável pelas ordens', function () {
  const req = {} as Request;
  const res = {} as Response;
  let next: Function;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
    next = (error: ErrorType) => (typeof error === 'object'
      ? res.status(error.http).send({ message: error.message })
      : 'próxima função');
    sinon.restore();
  });

  describe('Sequência de testes para casos de sucesso da requisição', function () {
    beforeEach(function () {
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns(res);
      sinon.restore();
    });

    it('Verifica se todas as orders são retornadas', async function () {
      const fakeService = sinon.stub(orderService, 'getAll').resolves(mocks.orders.ORDER_RETURN);

      await orderController.allOrders(req, res);

      sinon.assert.calledOnce(fakeService);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(mocks.orders.ORDER_RETURN);
    });

    it('Verifica se é possível registrar com sucesso uma nova ordem', async function () {
      req.body = mocks.orders.NEW_ORDER;
      const fakePostService = sinon.stub(orderService, 'postOrder')
        .resolves(mocks.orders.SUCCESS_ORDER_REGISTER);
      const fakeGetService = sinon.stub(userService, 'getUserById').resolves();

      await orderController.registerOrder(req, res, next as NextFunction);

      sinon.assert.calledOnce(fakeGetService);
      sinon.assert.calledOnce(fakePostService);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith(mocks.orders.SUCCESS_ORDER_REGISTER);
    });
  });

  describe('Sequência de testes para casos de falha', function () {
    beforeEach(function () {
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns(res);
      sinon.restore();
    });

    it('Verifica se é lançado um erro quando o usuário não é encontrado', async function () {
      const fakeGetService = sinon.stub(userService, 'getUserById').rejects(new Error('Error message'));

      await orderController.registerOrder(req, res, next as NextFunction);

      sinon.assert.calledOnce(fakeGetService);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.send).to.have.been.calledWith({ message: 'Error message' });
    });
  });
});
