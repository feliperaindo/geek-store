// Bibliotecas
import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

// Types
import { Request, Response } from 'express';
import { ErrorType } from '../../../src/types/exporter';

// Configuração
chai.use(sinonChai);

// Mocks
import * as mocks from '../../mocks/exporter';

// Service
import { orderService } from '../../../src/service/exporter'

// Camada controller a ser testada
import { orderController } from '../../../src/controller/exporter';

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
      const fakeService = sinon.stub(orderService, 'postOrder').resolves()
    });
  });

});
