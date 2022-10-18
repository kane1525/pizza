import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}

export type Sort = {
  // 4 связь типов
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  // 5 связь типов
  searchValue: string;
  currentPage: number;
  categoryId: number;
  sort: Sort; // 4 связь типов
}

const initialState: FilterSliceState = {
  // 5 связь типов
  searchValue: '',
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: 'Популярности',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setcategotyId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      // 4 связь типов
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      // 5 связь типов
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const sortSelector = (state: RootState) => state.filter.sort;
export const filterStateSelector = (state: RootState) => state.filter;

export const {
  setcategotyId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
