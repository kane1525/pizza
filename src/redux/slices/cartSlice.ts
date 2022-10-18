import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import { RootState } from '../store';

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

interface CartSliceState {
  totalPrice: number;
  items: CartItem[]; // 6 связь типов
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      // 6 связь типов
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
          nanoid: nanoid(),
        });
      }
      state.totalPrice += action.payload.price;
    },
    removeItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.nanoid === action.payload);
      if (findItem) {
        state.totalPrice -= findItem.price * findItem.count;
        state.items = state.items.filter(
          (item) => item.nanoid !== action.payload
        );
      }
    },
    clearItems(state, action) {
      state.items = [];
      state.totalPrice = 0;
    },
    plusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.nanoid === action.payload);

      if (findItem) {
        findItem.count++;
        state.totalPrice += findItem.price;
      }
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.nanoid === action.payload);

      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
  },
});

export const OneKindPizzaSelector = (id: string) => (state: RootState) =>
  state.cart.items.filter((item) => item.id === id);

export const cartSelector = (state: RootState) => state.cart;

export const { addItem, removeItem, clearItems, minusItem, plusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
