// Bibliotecas
import sinon from "sinon";
import jwt from 'jsonwebtoken';
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { describe, it } from 'mocha';

// Types
import { Login, Order, Product } from "../../../src/types/exporter";

// Configuração
chai.use(sinonChai);

// Mocks
import * as mocks from '../../mocks/exporter';

// Camada util a ser testada
import * as utils from '../../../src/utils/validator';

describe('Sequência de testes sobre as funções utilitárias', function () {
  it('Verifica se são lançados os erros se os campos de login não forem fornecidos', function () {
    expect(() => utils.loginFields(mocks.users.USER_LOGIN_NO_USERNAME as Login))
      .to.Throw(mocks.constants.LOGIN_ERROR_MESSAGE);

    expect(() => utils.loginFields(mocks.users.USER_LOGIN_NO_PASSWORD as Login))
      .to.Throw(mocks.constants.LOGIN_ERROR_MESSAGE);

    expect(() => utils.loginFields(mocks.users.USER_LOGIN_EMPTY_PASSWORD as Login))
      .to.Throw(mocks.constants.LOGIN_ERROR_MESSAGE);
    
    expect(() => utils.loginFields(mocks.users.USER_LOGIN_EMPTY_USERNAME as Login))
      .to.Throw(mocks.constants.LOGIN_ERROR_MESSAGE);
  })

  it('Verifica se são lançados os erros caso os campos esperados para produtos não sejam fornecidos', function () {
    expect(() => utils.productFields(mocks.products.PRODUCT_NO_NAME as Product))
      .to.Throw(mocks.constants.PRODUCT_NAME_ERROR_MESSAGE);
    
    expect(() => utils.productFields(mocks.products.PRODUCT_NO_PRICE as Product))
      .to.Throw(mocks.constants.PRODUCT_PRICE_ERROR_MESSAGE);
  });

  it('Verifica se são lançados os erros caso os campos esperados para ordens não sejam fornecidos', function () {
    expect(() => utils.orderFields(mocks.orders.ORDER_NO_USER_ID as Order<number[]>))
      .to.Throw(mocks.constants.ORDER_USER_ID_ERROR_MESSAGE);

    expect(() => utils.orderFields(mocks.orders.ORDER_NO_PRODUCT_IDS as Order<number[]>))
      .to.Throw(mocks.constants.ORDER_PRODUCT_IDS_ERROR_MESSAGE);
  });

  it('Verifica se a função validateNameAndPrice lança os erros esperados', function () {
    expect(() => utils.validateNameAndPrice({}, 'name'))
      .to.Throw(mocks.constants.NO_STRING_NAME);

    expect(() => utils.validateNameAndPrice({}, 'price'))
      .to.Throw(mocks.constants.NO_STRING_PRICE);
    
    expect(() => utils.validateNameAndPrice('a', 'price'))
      .to.Throw(mocks.constants.SHORT_PRICE);

    expect(() => utils.validateNameAndPrice('a', 'name'))
    .to.Throw(mocks.constants.SHORT_NAME);
  });

  it('Verifica se a função validateProductIds lança o erro ao fornecer parâmetro incorreto', function () {
    expect(() => utils.validateProductIds('string')).to.Throw(/^"productIds" must be an array$/);
    expect(() => utils.validateProductIds([])).to.Throw(/^"productIds" must include only numbers$/);
  });

  it('Verifica se a função de validação de token lança o erro caso não fornecido um token', function () {
    expect(() => utils.validateToken(undefined)).to.Throw(/^Token not found$/);
  });

  it('Verifica se a função de validação de token lança um erro caso fornecido um token inválido', function () {
    const fakeJwt = sinon.stub(jwt, 'verify').callsFake(() => { throw new Error(); });

    expect(() => utils.validateToken('Bearer invalid token')).to.Throw(/^Invalid token$/);
    sinon.assert.calledOnce(fakeJwt);
    sinon.assert.calledWith(fakeJwt, 'invalid token');

    sinon.restore();
  });
});