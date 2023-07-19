// Bibliotecas
import sinon from 'sinon';
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";

// Configuração
chai.use(sinonChai);

// Types
import { Request, Response, NextFunction } from 'express';
import { ErrorType } from '../../../src/types/exporter';

// Middleware a ser testado
import { errorMid } from '../../../src/middleware/exporter';

describe('Sequência de testes sobre o middleware de erro', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next: NextFunction = () => {};
  const error: ErrorType = { http: 404, message: 'mensagem de erro' };

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Verifica se a função de error retorna a responsa enviada para a função', function () {
    errorMid(error, req, res, next);

    expect(res.status).to.have.been.calledWith(error.http);
    expect(res.send).to.have.been.calledWith({ message: error.message });
  });
});