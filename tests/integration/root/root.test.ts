// Bibliotecas
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe, test } from 'mocha';

// Aplicação a ser testada
import app from '../../../src/app';

// Configuração
chai.use(chaiHttp);

describe('Sequência de testes sobre a rota "/" usando o método GET', function () {
  test('Verifica se a rota retorna a mensagem de healthCheck', async function () {
    const httpResponse = await chai.request(app).get('/');

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Aplicação está rodando' });
  });
});

