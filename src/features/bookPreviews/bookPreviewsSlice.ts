import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { BookPreview } from "src/types/BookPreview";
import { CategoryName } from "src/types/Category";
import { OrderByName } from "src/types/OrderByName";
import { DEFAULT_MAX_RESULTS } from "src/_CONSTANTS/general";
import { fetchFreshBookPreviews } from "./fetchFreshBookPreviews";
import { fetchLoadMoreBooks } from "./fetchLoadMoreBooks";

interface BookPreviewsState {
  items: BookPreviewItems;
  status: "loading" | "idle";
  error: string | null;

  /** Добавляем возможность передавать из стейта на случай, если захотим настраивать пагинацию динамически */
  maxResults: number;
}

export interface BookPreviewItems {
  list: BookPreview[];
  foundCount: number;
  currentCategory: CategoryName;
  currentOrder: OrderByName;
  currentQuery: string;
}

export type FetchBookPreviewsThunk_Return = Pick<BookPreviewItems, "list" | "foundCount"> & {
  newCategory: CategoryName;
  newOrder: OrderByName;
  newQuery: string;
};

export type FetchLoadMoreThunk_Return = Pick<BookPreviewItems, "list" | "foundCount">;

const initialState: BookPreviewsState = {
  items: {
    list: [],
    foundCount: 0,
    currentCategory: "All",
    currentOrder: "Relevant",
    currentQuery: ""
  },
  status: "idle",
  error: null,
  maxResults: DEFAULT_MAX_RESULTS
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
    
    builder.addCase(fetchFreshBookPreviews.rejected, (state: BookPreviewsState, {payload}: PayloadAction<string | undefined>) => {
      state.status = "idle";
      state.error = payload ? payload : "Unknown error";
    });

    builder.addCase(fetchFreshBookPreviews.fulfilled, (state: BookPreviewsState, {payload}: PayloadAction<FetchBookPreviewsThunk_Return>) => {
      const {foundCount, list, newCategory, newOrder, newQuery} = payload;

      state.items.currentCategory = newCategory;
      state.items.currentOrder = newOrder;
      state.items.currentQuery = newQuery;
      state.items.list = [...list];
      state.items.foundCount = foundCount;
      state.status = "idle";
    });

    builder.addCase(fetchLoadMoreBooks.pending, (state: BookPreviewsState) => {
      state.error = null;
      state.status = "loading";
    });

    builder.addCase(fetchLoadMoreBooks.rejected, (state: BookPreviewsState, {payload}: PayloadAction<string | undefined>) => {
      state.status = "idle";
      state.error = payload ? payload : "Unknown error";
    });

    builder.addCase(fetchLoadMoreBooks.fulfilled, (state: BookPreviewsState, {payload}: PayloadAction<FetchLoadMoreThunk_Return>) => {
      const {list, foundCount} = payload;

      state.items.list.push(...list);
      state.items.foundCount = foundCount;
      state.status = "idle";
    });
    
  }
});

export default reducer;
export const { clearBookPreviews } = actions;

export const useBookPreviews = (): RootState["bookPreviews"] => useSelector((state: RootState) => state.bookPreviews);
export const useBookPreviewsStatus = (): {
  error: RootState["bookPreviews"]["error"],
  status: RootState["bookPreviews"]["status"]
} => useSelector((state: RootState) => ({
  error: state.bookPreviews.error,
  status: state.bookPreviews.status
}));