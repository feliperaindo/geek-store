// Bibliotecas
import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

// Types
import { Request, Response } from 'express';

// Configuração
chai.use(sinonChai);

// Mocks
import * as mock from '../../mocks/exporter';

// Model
import { productModel } from '../../../src/database/models/exporter';

// Service
import { productService } from '../../../src/service/exporter';

// Camada controller a ser testada
import { productController } from '../../../src/controller/exporter';

describe('Sequência de testes sobre a camada controller dos produtos', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Verifica se a camada devolve todos os produtos quando requisitado', async function () {
    const fakeModel = productModel.bulkBuild(mock.products.PRODUCT_LIST);

    const fakeService = sinon.stub(productService, 'getAll').resolves(fakeModel)

    await productController.allProducts(req, res);

    sinon.assert.calledOnce(fakeService);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.send).to.have.been.calledWith(fakeModel)
  });

  it('Verifica se ao registrar um novo produto a resposta adequada é retornada', async function () {
    req.body = mock.products.PRODUCT_2_NO_ID;

    const fakeService = sinon.stub(productService, 'postProduct').resolves(mock.products.PRODUCT_2_RETURN);

    await productController.registerProduct(req, res);

    sinon.assert.calledOnce(fakeService);
    sinon.assert.calledWith(fakeService, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.send).to.have.been.calledWith(mock.products.PRODUCT_2_RETURN);
  });
});
