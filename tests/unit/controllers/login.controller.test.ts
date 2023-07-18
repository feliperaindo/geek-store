// Bibliotecas
import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

// Types
import { NextFunction, Request, Response } from 'express';

// Configuração
chai.use(sinonChai);

// Mocks
import * as mock from '../../mocks/exporter';

// Service
import { userService } from '../../../src/service/exporter';

// Camada controller a ser testada
import { userController } from '../../../src/controller/exporter';

describe('Sequência de testes sobre a camada controller responsável pelo Login', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub().returns(null) as NextFunction;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Verifica o retorno da função em caso do envio de um usuário válido', async function () {
    req.body = mock.users.USER_LOGIN_1;
    const fakeService = sinon.stub(userService, 'verifyUser').resolves({ token: 'valid token' });

    await userController.singIn(req, res, next);

    sinon.assert.calledOnce(fakeService);
    sinon.assert.calledWith(fakeService, mock.users.USER_LOGIN_1);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.send).to.have.been.calledWith({ token: 'valid token' });
  });

  it('Verifica se a função next é chamada caso um usuário não seja encontrado', async function () {
    const fakeService = sinon.stub(userService, 'verifyUser')
      .rejects(new Error('Username or password invalid'));

    await userController.singIn(req, res, next);

    sinon.assert.calledOnce(fakeService);
    expect(next).to.have.been.calledWith({ message: 'Username or password invalid', http: 401 });
  });
});
