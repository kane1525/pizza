import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import pizzaReducer from './slices/pizzaSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizzas: pizzaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// мы по отдельности типизируем все редьюсеры (каждый инишл стейт в каждом слайсе)
// но так же нам нужно собрать все эти слайсы в 1 стор и его типизировать
// 15 строка делает все это автоматически и мы получаем наш типизированный целый стейт, который мы можем потом использовать, там  где нам нужно

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
// из инстуркции РТК, что б работали асинхронные екшены
// и потом там где используем асинхронные екшены пишем что наш dispatch не useDispatch а useAppDispatch импортированный от сюда
