// Bibliotecas
import sinon from 'sinon';
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";

// Configuração
chai.use(sinonChai);

// Types
import { Request, Response, NextFunction } from 'express';
import { ErrorType } from '../../../src/types/exporter';

// Mocks
import * as mocks from '../../mocks/exporter';

// Middleware a ser testado
import { productMid } from '../../../src/middleware/exporter';

describe('Sequência de testes sobre o mid de produtos', function () {
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

    it('Verifica se o mid de validação de campos não lança um erro caso todos os parâmetros existam', function () {
      req.body = mocks.products.PRODUCT_1;

      productMid.productFieldsMid(req, res, next);

      expect(next).to.have.been.calledOnce
      expect(next).to.have.been.calledWith();
    })

    it('Verifica se o mid de validação de informação não lança um erro caso todos os parâmetros estejam corretos', function () {
      req.body = mocks.products.PRODUCT_1;

      productMid.productsInfoMid(req, res, next);

      expect(next).to.have.been.calledOnce
      expect(next).to.have.been.calledWith();
    })
  });

  describe('Sequência de testes para os casos de falha dos mids usados', function () {
    beforeEach(function () { 
      sinon.restore();
      next = sinon.stub().returns(null);
    });

    it('Verifica se o mid de validação de informação lança um erro caso não exista o campo name', function () {
      req.body = mocks.products.PRODUCT_NO_NAME;

      const error: ErrorType = { http: 422, message: '"name" must be a string' };

      productMid.productsInfoMid(req, res, next);

      expect(next).to.have.been.calledOnce
      expect(next).to.have.been.calledWith(error);
    });

    it('Verifica se o mid de validação de informação lança um erro caso não exista o campo price', function () {
      req.body = mocks.products.PRODUCT_NO_PRICE;

      const error: ErrorType = { http: 422, message: '"price" must be a string' };

      productMid.productsInfoMid(req, res, next);

      expect(next).to.have.been.calledOnce
      expect(next).to.have.been.calledWith(error);
    })

    it('Verifica se o mid de validação de campos lança um erro caso não receba algum campo', function () {
      req.body = mocks.products.PRODUCT_NO_NAME;

      const error: ErrorType = { http: 400, message: '"name" is required' };

      productMid.productFieldsMid(req, res, next);

      expect(next).to.have.been.calledOnce
      expect(next).to.have.been.calledWith(error);
    })
  });
});