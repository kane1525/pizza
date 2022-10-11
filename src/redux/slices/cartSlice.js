import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
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
    removeItem(state, action) {
      const findItem = state.items.find((obj) => obj.nanoid === action.payload);
      state.totalPrice -= findItem.price * findItem.count;
      state.items = state.items.filter(
        (item) => item.nanoid !== action.payload
      );
    },
    clearItems(state, action) {
      state.items = [];
      state.totalPrice = 0;
    },
    plusItem(state, action) {
      const findItem = state.items.find((obj) => obj.nanoid === action.payload);

      findItem.count++;
      state.totalPrice += findItem.price;
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.nanoid === action.payload);

      findItem.count--;
      state.totalPrice -= findItem.price;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem, plusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
