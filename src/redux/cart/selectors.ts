import { RootState } from '../store';

export const OneKindPizzaSelector = (id: string) => (state: RootState) =>
  state.cart.items.filter((item) => item.id === id);

export const cartSelector = (state: RootState) => state.cart;
