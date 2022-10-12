import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasById',
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://63382940937ea77bfdbb5eea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    console.log(data);
    return data;
  }
);

const initialState = {
  items: [],
  status: 'pending',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items.push(...action.payload);
        state.status = 'fulfilled';
      })
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'pending';
        state.items = [];
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'rejected';
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
