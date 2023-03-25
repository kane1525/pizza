export type CartItem = {
  // 6 связь типов
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
  nanoid?: string;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[]; // 6 связь типов
}
