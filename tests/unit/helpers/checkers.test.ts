// Bibliotecas
import { expect } from 'chai';
import { describe, it } from 'mocha';

// Camada a helpers a ser testada
import * as helpers from '../../../src/helpers/checkers';

describe('Sequência de testes sobre as funções auxiliares "helpers"', function () {
  it('Verifica se a função "keyChecker" valida se um objeto tem as chaves', function () {
    expect(helpers.keyChecker({ name: 'string' }, 'name')).to.be.true;
    expect(helpers.keyChecker({ name: 'string' }, 'price')).to.be.false;
  });

  it('Verifica se a função "stringChecker" valida o parâmetro recebido', function () {
    expect(helpers.stringChecker({})).to.be.false;
    expect(helpers.stringChecker('eu sou uma string')).to.be.true;
  });

  it('Verifica se a função "stringLengthChecker" valida corretamente o tamanho', function () {
    expect(helpers.stringLengthChecker('')).to.be.false;
    expect(helpers.stringLengthChecker('string longa')).to.be.true;
  });

  it('Verifica se a função "numberChecker" valida corretamente o parâmetro', function () {
    expect(helpers.numberChecker(5)).to.be.true;
    expect(helpers.numberChecker([])).to.be.false;
  });

  it('Verifica se a função "arrayChecker" valida corretamente o parâmetro', function () {
    expect(helpers.arrayChecker([])).to.be.true;
    expect(helpers.arrayChecker(false)).to.be.false;
  });

  it('Verifica se a função "isEmpty" valida corretamente o parâmetro', function () {
    expect(helpers.isEmpty('')).to.be.false;
    expect(helpers.isEmpty('string cheia')).to.be.true;
  });
});