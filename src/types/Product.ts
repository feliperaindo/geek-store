export type Product = {
  id?: number;
  name: string;
  price: string;
  orderId: number;
};

export type SuccessPost = {
  id?: number,
  name: string,
  price: string
}; 

export type NameOrPrice = 'name' | 'price';