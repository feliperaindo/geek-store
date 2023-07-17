import { Order, Id } from "../../src/types/exporter";

export const ORDER: Order<Id[]>[] = [
  { id: 1, userId: 3, productIds: [{ id: 5 }, { id: 2 }] },
  { id: 2, userId: 2, productIds: [{ id: 1 }, { id: 3 }] },
  { id: 3, userId: 4, productIds: [{ id: 6 }, { id: 8 }, { id: 4 }] },
];

export const ORDER_RETURN: Order<number[]>[] = [
  { id: 1, userId: 3, productIds: [5, 2] },
  { id: 2, userId: 2, productIds: [1, 3] },
  { id: 3, userId: 4, productIds: [6, 8, 4] },
];

export const NEW_ORDER: Order<number[]> = { id: 4, userId: 5, productIds: [7, 9] };

export const SUCCESS_ORDER_REGISTER: Order<number[]> = { userId: 5, productIds: [7, 9] }