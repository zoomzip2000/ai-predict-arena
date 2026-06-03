import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";

export interface CategoryItem {
  label: string;
  href: string;
  uuid: string;
  data: any;
}

export interface CategoryState {
  marketCategory: CategoryItem[];
  canceledCategory: CategoryItem[];
  calendarCategory: CategoryItem[];
}

const initialState: CategoryState = {
  marketCategory: [],
  canceledCategory: [],
  calendarCategory: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getMarketCategory(state, action: PayloadAction<CategoryItem[]>) {
      state.marketCategory = action.payload;
    },
    getCanceledCategory(state, action: PayloadAction<CategoryItem[]>) {
      state.canceledCategory = action.payload;
    },
    getCalendarCategory(state, action: PayloadAction<CategoryItem[]>) {
      state.calendarCategory = action.payload;
    },
  },
});

export const { getMarketCategory, getCanceledCategory, getCalendarCategory } = categorySlice.actions;

export default categorySlice.reducer;
