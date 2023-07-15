export type Order<TypeIds> = {
  id: number;
  userId: number;
  productIds?: TypeIds,
};
