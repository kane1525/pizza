import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchPizzas } from './asyncActions';
import { PizzaSliceState, Status, SearchPizzaParams, Pizza } from './types';

const initialState: PizzaSliceState = {
  items: [],
  status: Status.PENDING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      // 3 связь типов
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items.push(...action.payload);
        state.status = Status.FULFILLED;
      })
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.PENDING;
        state.items = [];
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.REJECTED;
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
