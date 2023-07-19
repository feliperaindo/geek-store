// Bibliotecas
import sinon from 'sinon';
import { expect } from 'chai';
import { describe, it } from 'mocha';

// mocks
import * as mock from '../../mocks/exporter';

// Model
import { productModel } from '../../../src/database/models/exporter';

// Camada a ser testada
import { productService } from '../../../src/service/exporter';

describe('Sequência de testes sobre a camada service responsável pelos produtos', function () {
  beforeEach(function () { sinon.restore(); });

  it('Verifica o retorno da camada service ao requisitar todos os produtos', async function () {
    const fakeModel = productModel.bulkBuild(mock.products.PRODUCT_LIST);

    const fakeMethod = sinon.stub(productModel, 'findAll').resolves(fakeModel);

    const all = await productService.getAll();
    
    sinon.assert.calledOnce(fakeMethod);
    expect(all).to.be.deep.equal(fakeModel);
  });

  it('Verifica o retorno da camada service ao cadastrar um novo produto', async function () {
    const fakeModel = productModel.build(mock.products.PRODUCT_2);

    const fakeMethod = sinon.stub(productModel, 'create').resolves(fakeModel);

    const success = await productService.postProduct(mock.products.PRODUCT_2_NO_ID);

    sinon.assert.calledOnce(fakeMethod);
    expect(success).to.be.deep.equal(mock.products.PRODUCT_2_RETURN);
  });
});
