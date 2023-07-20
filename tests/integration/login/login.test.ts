// Bibliotecas
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import { describe, test } from 'mocha';

// Aplicação a ser testada
import app from '../../../src/app';

// Model
import { userModel } from '../../../src/database/models/exporter';

// Mocks
import * as mocks from '../../mocks/exporter';

// Configuração
chai.use(chaiHttp);
chai.use(sinonChai);

describe('Sequência de testes sobre a rota /login usando o método POST', function () {
  beforeEach(function () { sinon.restore(); });
  
  describe('Sequência de testes para casos de sucesso', function () {
    beforeEach(function () { sinon.restore(); });

    test('Verifica se a rota retorna um token caso um usuário valido faça login', async function () {
      const fakeUserDb = userModel.build(mocks.users.USER_1);

      const fakeBcrypt = sinon.stub(bcrypt, 'compare').resolves(true);
      const fakeUserModel = sinon.stub(userModel, 'findOne').resolves(fakeUserDb);
  
      const httpResponse = await chai.request(app)
        .post('/login')
        .send(mocks.users.USER_LOGIN_1);

      expect(fakeUserModel).to.have.been.calledOnce;
      expect(fakeUserModel).to.have.been.calledWith({ where: { username: mocks.users.USER_LOGIN_1.username } });

      expect(fakeBcrypt).to.have.been.calledOnce;
      expect(fakeBcrypt).to.have.been.calledWith(mocks.users.USER_1.password);

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.haveOwnProperty('token');
      expect(httpResponse.body.token).to.not.be.undefined;
      expect(httpResponse.body.token).to.not.be.null;
      expect(httpResponse.body.token).to.not.be.empty;
      expect(httpResponse.body.token).to.not.be.false;
      expect(httpResponse.body.token).to.have.length.greaterThan(200);
    });
  })

  describe('Sequência de testes para casos de falha', function () {
    beforeEach(function () { sinon.restore(); });

    test('Verifica se é retorna um status de erro caso faltem parâmetros obrigatórios', async function () {
      const httpResponse = await chai.request(app)
        .post('/login')
        .send(mocks.users.USER_LOGIN_NO_PASSWORD);

      expect(httpResponse.status).to.be.equal(400);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.match(mocks.constants.LOGIN_ERROR_MESSAGE);
    });

    test('Verifica se é retorna um status de erro caso algum parâmetro esteja incorreto', async function () {
      const httpResponse = await chai.request(app)
        .post('/login')
        .send(mocks.users.USER_LOGIN_EMPTY_USERNAME);

      expect(httpResponse.status).to.be.equal(400);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.match(mocks.constants.LOGIN_ERROR_MESSAGE);
    });

    test('Verifica se é retorna um status de erro caso o usuário não seja encontrado', async function () {
      sinon.stub(userModel, 'findOne').resolves(null);

      const httpResponse = await chai.request(app)
        .post('/login')
        .send(mocks.users.USER_LOGIN_1);

      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.match(/^Username or password invalid$/);
    });

    test('Verifica se é retorna um status de erro caso a senha esteja incorreta', async function () {
      const fakeUserDb = userModel.build(mocks.users.USER_1);

      sinon.stub(bcrypt, 'compare').resolves(false);
      sinon.stub(userModel, 'findOne').resolves(fakeUserDb);

      const httpResponse = await chai.request(app)
        .post('/login')
        .send(mocks.users.USER_LOGIN_1);

      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.match(/^Username or password invalid$/);
    });
  });
});
