import { Product } from "../../src/types/Product"

export const PRODUCT_1: Product = {
  id: 1,
  name: 'Arco Atirador do Sol',
  price: '50 peças de ouro',
  orderId: 3
}

export const PRODUCT_2: Product = {
  id: 2,
  name: 'Lança de Clarear Céu',
  price: '2 almas de dragões',
  orderId: 1
}

export const PRODUCT_2_NO_ID: Product = {
  name: 'Lança de Clarear Céu',
  price: '2 almas de dragões',
  orderId: 1
}

export const PRODUCT_2_RETURN = {
  id: 2,
  name: 'Lança de Clarear Céu',
  price: '2 almas de dragões',
}

export const PRODUCTS_ORDER: Product[] = [
  { id: 7, name: 'Manopla do infinito', orderId: 4, price: 'Alma do Tony Stark' },
  { id: 8, name: 'Punho de aço', orderId: 4, price: '10 moedas de prata' },
]

export const PRODUCT_LIST: Product[] = [PRODUCT_1, PRODUCT_2];

export const PRODUCT_NO_PRICE = { name: 'Manopla do infinito' };

export const PRODUCT_NO_NAME = { price: 'Alma do Tony Stark' };