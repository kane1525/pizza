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
