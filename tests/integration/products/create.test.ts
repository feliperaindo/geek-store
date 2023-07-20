// Bibliotecas
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import { describe, test } from 'mocha';

// Aplicação a ser testada
import app from '../../../src/app';

// Model
import { productModel } from '../../../src/database/models/exporter';

// Mocks
import * as mocks from '../../mocks/exporter';

// Configuração
chai.use(chaiHttp);
chai.use(sinonChai);

describe('Sequência de testes sobre a rota /products usando o método POST', function () {
  describe('Sequência de testes para casos de sucesso', function () {
    beforeEach(function () { sinon.restore(); });

    test('Verifica se a rota retorna corretamente o produto cadastrado', async function () {
      const fakeDb = productModel.build(mocks.products.PRODUCT_1);
      const fakeModel = sinon.stub(productModel, 'create').resolves(fakeDb);
  
      const httpResponse = await chai.request(app)
        .post('/products')
        .send(mocks.products.PRODUCT_1);
  
      expect(fakeModel).to.have.been.calledOnce;
      expect(fakeModel).to.have.been.calledWith(mocks.products.PRODUCT_1);
      expect(httpResponse.status).to.be.equal(201);
      expect(httpResponse.body).to.be.deep.equal(mocks.products.PRODUCT_1_RETURN);
    });
  })

  describe('Sequência de testes para casos de falha', function () {
    test('Verifica se é retorna um status de erro caso o corpo da requisição esteja incompleto', async function () {
      const httpResponse = await chai.request(app)
        .post('/products')
        .send(mocks.products.PRODUCT_NO_PRICE);

      expect(httpResponse.status).to.be.equal(400);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.match(mocks.constants.PRODUCT_PRICE_ERROR_MESSAGE)
    });

    test('Verifica se é retorna um status de erro caso não o corpo da requisição esteja errado', async function () {
      const httpResponse = await chai.request(app)
        .post('/products')
        .send(mocks.products.PRODUCT_INCORRECT);

      expect(httpResponse.status).to.be.equal(422);
      expect(httpResponse.body).to.haveOwnProperty('message');
      expect(httpResponse.body.message).to.match(mocks.constants.NO_STRING_NAME)
    })
  });
});

