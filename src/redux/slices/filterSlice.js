import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: 'Популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setcategotyId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const { setcategotyId, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
