import { RootState } from '../store';

export const sortSelector = (state: RootState) => state.filter.sort;
export const filterStateSelector = (state: RootState) => state.filter;
