// Bibliotecas
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';

// Types
import { Request, Response, NextFunction } from 'express';
import { ErrorType } from '../../../src/types/exporter';

// Mocks
import * as mocks from '../../mocks/exporter';

// Middleware a ser testado
import { orderMid } from '../../../src/middleware/exporter';

// Configuração
chai.use(sinonChai);

describe('Sequência de testes sobre o middleware "orderMid"', function () {
  const req = {} as Request;
  const res = {} as Response;
  let next: NextFunction;

  beforeEach(function () { 
    sinon.restore();
    next = sinon.stub().returns(null);
  });

  describe('Sequência de testes em caso de sucesso dos mid usados', function () {
    beforeEach(function () { 
      sinon.restore();
      next = sinon.stub().returns(null);
    });

    it('Verifica se o mid de validação de token não lança um erro ao receber um token válido', function () {
      req.headers = { authorization: 'Bearer valid token' };
      const fakeJwt = sinon.stub(jwt, 'verify').callsFake(() => true);
  
      orderMid.validateToken(req, res, next);
  
      expect(next).to.have.been.calledOnce;
      expect(fakeJwt).to.have.been.calledOnce;
      expect(next).to.have.been.calledWith();
      expect(fakeJwt).to.have.been.calledWith('valid token');
    });

    it('Verifica se o mid de validação de campos não lança um erro ao fornecer todos os parâmetros', function () {
      req.body = mocks.orders.NEW_ORDER;

      orderMid.orderFieldMid(req, res, next);

      expect(next).to.have.been.calledOnce;
      expect(next).to.have.been.calledWith();
    });

    it('Verifica se o mid de validação de informação não lança um erro ao fornecer todos os parâmetros', function () {
      req.body = mocks.orders.NEW_ORDER;

      orderMid.orderInfoMid(req, res, next);

      expect(next).to.have.been.calledOnce;
      expect(next).to.have.been.calledWith();
    });
  });

  describe('Sequência de testes para os casos de falha dos mids usados', function () {
    beforeEach(function () { 
      sinon.restore();
      next = sinon.stub().returns(null);
    });

    it('Verifica se é chamada a função next com parâmetro correto ao fornecer um token inválido', function () {
      req.headers = { authorization: 'Bearer invalid token' };
      const fakeJwt = sinon.stub(jwt, 'verify').callsFake(() => { throw new Error(); });

      const error: ErrorType = { http: 401, message: 'Invalid token' };
  
      orderMid.validateToken(req, res, next);
  
      expect(next).to.have.been.calledOnce;
      expect(fakeJwt).to.have.been.calledOnce;
      expect(next).to.have.been.calledWith(error);
      expect(fakeJwt).to.have.been.calledWith('invalid token');
    });

    it('Verifica se o mid de validação de campos lança erro esperado ao  não fornecer todos os parâmetros', function () {
      req.body = mocks.orders.ORDER_NO_PRODUCT_IDS;

      const error = { message: mocks.constants.ORDER_PRODUCT_IDS_ERROR_STRING, http: 400 };

      orderMid.orderFieldMid(req, res, next);

      expect(next).to.have.been.calledOnce;
      expect(next).to.have.been.calledWith(error);
    });

    it('Verifica se o mid de validação de informação lança um erro ao fornecer um userId incorreto', function () {
      req.body = mocks.orders.ORDER_INCORRECT;

      const error = { message: '"userId" must be a number', http: 422 };

      orderMid.orderInfoMid(req, res, next);

      expect(next).to.have.been.calledOnce;
      expect(next).to.have.been.calledWith(error);
    });

    it('Verifica se o mid de validação de informação lança um erro ao fornecer um productIds incorretos', function () {
      req.body = mocks.orders.ORDER_INCORRECT_2;

      const error = { message: '"productIds" must be an array', http: 422 };

      orderMid.orderInfoMid(req, res, next);

      expect(next).to.have.been.calledOnce;
      expect(next).to.have.been.calledWith(error);
    });
  });
});