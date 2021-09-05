import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { BookPreview } from "src/types/BookPreview";
import { CategoryName } from "src/types/Category";
import { OrderByName } from "src/types/OrderByName";
import { fetchFreshBookPreviews } from "./fetchFreshBookPreviews";

interface BookPreviewsState {
  items: BookPreviewItems;
  status: "loading" | "idle";
  error: string | null;
}

export interface BookPreviewItems {
  list: BookPreview[];
  foundCount: number;
  currentCategory: CategoryName;
  currentOrder: OrderByName;
}

export type FetchBookPreviewsThunk_Return = Pick<BookPreviewItems, "list" | "foundCount"> & {
  newCategory: CategoryName;
  newOrder: OrderByName;
};

const initialState: BookPreviewsState = {
  items: {
    list: [],
    foundCount: 0,
    currentCategory: "All",
    currentOrder: "Relevant"
  },
  status: "idle",
  error: null,
};

const {reducer, actions} = createSlice({
  name: "bookPreviews",
  initialState,
  reducers: {
    clearBookPreviews: (): BookPreviewsState => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFreshBookPreviews.pending, (state: BookPreviewsState) => {
      state.error = null;
      state.status = "loading";
    });

    builder.addCase(fetchFreshBookPreviews.fulfilled, (state: BookPreviewsState, {payload}: PayloadAction<FetchBookPreviewsThunk_Return>) => {
      const {foundCount, list, newCategory, newOrder} = payload;

      state.items.currentCategory = newCategory;
      state.items.currentOrder = newOrder;
      state.items.list = [...list];
      state.items.foundCount = foundCount;
      state.status = "idle";
    });

    builder.addCase(fetchFreshBookPreviews.rejected, (state: BookPreviewsState, {payload}: PayloadAction<string | undefined>) => {
      state.status = "idle";
      state.error = payload ? payload : "Unknown error";
    });

    
  }
});

export default reducer;
export const { clearBookPreviews } = actions;

export const useBookPreviews = (): RootState["bookPreviews"] => useSelector((state: RootState) => state.bookPreviews);