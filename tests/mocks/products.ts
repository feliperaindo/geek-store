import { Product } from '../../src/types/Product';

const LANCE = 'Lança de Clarear Céu';

const MANOPLA = 'Manopla do infinito';

const SOUL_DRAGON = '2 almas de dragões';

const SOUL_STARK = 'Alma do Tony Stark';

export const PRODUCT_1: Product = {
  id: 1,
  name: 'Arco Atirador do Sol',
  price: '50 peças de ouro',
  orderId: 3,
};

export const PRODUCT_2: Product = {
  id: 2,
  name: LANCE,
  price: SOUL_DRAGON,
  orderId: 1,
};

export const PRODUCT_2_NO_ID: Product = {
  name: LANCE,
  price: SOUL_DRAGON,
  orderId: 1,
};

export const PRODUCT_2_RETURN = {
  id: 2,
  name: LANCE,
  price: SOUL_DRAGON,
};

export const PRODUCTS_ORDER: Product[] = [
  { id: 7, name: MANOPLA, orderId: 4, price: SOUL_STARK },
  { id: 8, name: 'Punho de aço', orderId: 4, price: '10 moedas de prata' },
];

export const PRODUCT_LIST: Product[] = [PRODUCT_1, PRODUCT_2];

export const PRODUCT_NO_PRICE = { name: MANOPLA };

export const PRODUCT_NO_NAME = { price: SOUL_STARK };

export const PRODUCT_INCORRECT = { name: 10, price: SOUL_STARK };

export const PRODUCT_INCORRECT_2 = { name: MANOPLA, price: false };