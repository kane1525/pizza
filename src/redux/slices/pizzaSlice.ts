import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

// type FetchPizzasArgs = Record<string, string>;
// эта запись значит что у меня есть объетк со свойствами типа стринг и их значениями типа стринг

// 2 ВАРИАНТ ТИПИЗАЦИИ ТАКОЙ ЖЕ САМЫЙ
// export const fetchPizzas = createAsyncThunk<CartItem[], Record<string, string>>( // вся типизация тут
//   'pizza/fetchPizzasById',
//   async (params) => {
//     const { order, sortBy, category, search, currentPage } = params;
//     const { data } = await axios.get(
//       `https://63382940937ea77bfdbb5eea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
//     );
//     return data;
//   }
// );

type Pizza = {
  // 3 связь типов
  // в ответе еще приходит category, может его нужно использовать, нужно гялнуть
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  category: number;
};
// используем что б создать шаблон для нашего стейта
// что б типизировать ответ аксиоса и ответ нашей асинк ф-ции
// в экшене setItems, который, как я понял, нигде не исопльзуется

export enum Status {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}
// вроде понятно

interface PizzaSliceState {
  items: Pizza[]; // 3 связь типов
  status: Status;
}
// для типизации нашего стейта пицц

const initialState: PizzaSliceState = {
  items: [],
  status: Status.PENDING,
};

export type SearchPizzaParams = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: string;
};
///2 Связь типов
// для типизации пропсов ф-ции fetchPizzas
// говорим, что в пропсы должен попадать такой объект, который подходит под шаблон SearchPizzaParams

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasById',
  async (params: SearchPizzaParams) => {
    //2 Связь типов
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>( // 3 связь типов
      `https://63382940937ea77bfdbb5eea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data as Pizza[]; // 3 связь типов
  }
);

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

export const pizzasStateSelector = (state: RootState) => state.pizzas;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
