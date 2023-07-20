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

describe('Sequência de testes sobre a rota /products usando o método GET', function () {
  beforeEach(function () { sinon.restore(); });

  test('Verifica se a rota retorna corretamente todos os produtos', async function () {
    const fakeDb = productModel.bulkBuild(mocks.products.PRODUCT_LIST);
    const fakeModel = sinon.stub(productModel, 'findAll').resolves(fakeDb);

    const httpResponse = await chai.request(app).get('/products');

    expect(fakeModel).to.have.been.calledOnce;
    expect(fakeModel).to.have.been.calledWith();
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(mocks.products.PRODUCT_LIST);
  });
});
