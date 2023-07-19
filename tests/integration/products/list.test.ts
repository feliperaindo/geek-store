// Bibliotecas
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';

// Aplicação a ser testada
import server from '../../../src/server';

// Configuração
chai.use(chaiHttp);

describe('GET /products', function () {
  beforeEach(function () { sinon.restore(); });
});
