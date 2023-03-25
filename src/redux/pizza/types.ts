export type Pizza = {
  // 3 связь типов
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  category: number;
};

export enum Status {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}
// вроде понятно

export interface PizzaSliceState {
  items: Pizza[]; // 3 связь типов
  status: Status;
}

export type SearchPizzaParams = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: string;
};
///2 Связь типов
