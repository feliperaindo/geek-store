// Bibliotecas
import sinon from 'sinon';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

// Configuração
chai.use(chaiAsPromised)

// utils
import utils from '../../../src/utils/exporter';

// mocks
import * as mock from '../../mocks/exporter';

// Camada Model
import { userModel } from '../../../src/database/models/exporter';

// Camada service a ser testada
import { userService } from '../../../src/service/exporter';

describe('Sequência de testes sobre a camada service que gerenciar funções de usuário', function () {
  beforeEach(function () { sinon.restore(); });

  describe('Sequência de testes para casos de sucesso', function () {
    beforeEach(function () { sinon.restore(); });

    it('Verifica se é possível recuperar um usuário pelo Id', async function () {
      const fakeModel = userModel.build(mock.users.USER_2);
  
      const fakeMethod = sinon.stub(userModel, 'findByPk').resolves(fakeModel);
  
      const user = await userService.getUserById(mock.users.USER_2.id.toString());
  
      sinon.assert.calledOnce(fakeMethod);
      expect(user).to.be.deep.equal(fakeModel);
    });

    it('Verifica se ao inserir um usuário e senha válidos retorna um token', async function () {
      const fakeModel = userModel.build(mock.users.USER_1);
  
      const fakeMethod = sinon.stub(userModel, 'findOne').resolves(fakeModel);
      const fakeBcrypt = sinon.stub(bcrypt, 'compare').resolves(true);
      const fakeJwt = sinon.stub(jwt, 'sign').callsFake(() => 'valid token');
  
      const user = await userService.verifyUser(mock.users.USER_LOGIN_1);
  
      sinon.assert.calledOnce(fakeJwt);
      sinon.assert.calledOnce(fakeMethod);
      sinon.assert.calledOnce(fakeBcrypt);
      expect(user).to.be.deep.equal({ token: 'valid token' });
    })
  })
  
  describe('Sequência de testes para casos de falha', function () {
    beforeEach(function () { sinon.restore(); });

    it('Verifica se lançado um erro caso não seja encontrando o usuário pelo Id', async function () {
      sinon.stub(userModel, 'findByPk').resolves(null);
  
      const captureError = () => userService.getUserById(mock.users.USER_1.id.toString());
  
      return expect(captureError()).to.eventually.be.rejectedWith(/^"userId" not found$/)
        .to.be.an.instanceOf(Error);
    })

    it('Verifica se ao tentar validar um usuário não existente a camada retorna um erro', async function () {
      sinon.stub(userModel, 'findOne').resolves(null);
  
      const captureError = () => userService.verifyUser(mock.users.USER_LOGIN_1);
  
      return expect(captureError()).to.eventually.be.rejectedWith(/^Username or password invalid$/)
        .to.be.an.instanceOf(Error);
    });

    it('Verifica se ao tentar validar um usuário existente com senha inválida a camada retorna um erro', async function () {
      const fakeModel = userModel.build(mock.users.USER_1);

      sinon.stub(userModel, 'findOne').resolves(fakeModel);
      sinon.stub(bcrypt, 'compare').resolves(false);
  
      const captureError = () => userService.verifyUser(mock.users.USER_LOGIN_1);
  
      return expect(captureError()).to.eventually.be.rejectedWith(/^Username or password invalid$/)
        .to.be.an.instanceOf(Error);
    });
  });
});
