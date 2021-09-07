import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { BookFull } from "src/types/BookFull";
import { fetchBookOrGetCached } from "./fetchBookOrGetCached";

export type CachedBooks = Record<string, BookFull>;

interface CurrentBookState {
  cachedBooks: CachedBooks;
  currentBook: BookFull | null;
  status: "loading" | "idle";
  error: string | null;
}

const initialState: CurrentBookState = {
  cachedBooks: {},
  currentBook: null,
  status: "idle",
  error: null
}

const {reducer} = createSlice({
  name: "currentBook",
  initialState,
  reducers: { },
  extraReducers: builder => {
    builder.addCase(fetchBookOrGetCached.pending, (state: CurrentBookState) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchBookOrGetCached.rejected, (state: CurrentBookState, {payload}: PayloadAction<string | undefined>) => {
      state.status = "idle";
      state.error = payload || "Unknown error =(";
    });

    builder.addCase(fetchBookOrGetCached.fulfilled, (state: CurrentBookState, {payload}: PayloadAction<BookFull>) => {
      const {currentBook} = state;
      if (currentBook) {
        state.cachedBooks[currentBook.id] = currentBook;
      }

      state.currentBook = payload;
      state.status = "idle";
    });
  }
});

export default reducer;

export const useCurrentBook = (): RootState["currentBook"] => useSelector((state: RootState) => state.currentBook);