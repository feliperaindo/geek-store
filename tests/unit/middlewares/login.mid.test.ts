// Bibliotecas
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';

// Types
import { Request, Response, NextFunction } from 'express';
import { ErrorType } from '../../../src/types/exporter';

// Mocks
import * as mocks from '../../mocks/exporter';

// Middleware a ser testado
import { loginMid } from '../../../src/middleware/exporter';

// Configuração
chai.use(sinonChai);

describe('Sequência de testes sobre o middleware de login', function () {
  const req = {} as Request;
  const res = {} as Response;
  let next: NextFunction;
  const error: ErrorType = { http: 400, message: mocks.constants.LOGIN_ERROR_STRING };

  beforeEach(function () { 
    sinon.restore();
    next = sinon.stub().returns(null);
  });

  it('Verifica se em caso de sucesso não é lançado nenhum erro', function () {
    req.body = mocks.users.USER_LOGIN_1;
    loginMid(req, res, next);

    expect(next).to.have.been.calledOnce;
    expect(next).to.have.been.calledWith();
  });

  it('Verifica se em caso de erro a função next é chamada corretamente', function () {
    req.body = mocks.users.USER_LOGIN_EMPTY_PASSWORD;
    loginMid(req, res, next);

    expect(next).to.have.been.calledOnce;
    expect(next).to.have.been.calledWith(error);
  });
});