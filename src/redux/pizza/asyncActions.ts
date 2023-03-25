import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SearchPizzaParams, Pizza } from './types';

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
