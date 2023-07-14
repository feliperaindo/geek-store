export type Id = {
  id: number
};

export type Order<TypeIds> = {
  id: number;
  userId: number;
  productIds?: TypeIds,
};
