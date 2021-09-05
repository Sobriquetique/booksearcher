import { configureStore } from "@reduxjs/toolkit";
import bookPreviewsReducer from "src/features/bookPreviews/bookPreviewsSlice";

export const store = configureStore({
  reducer: {
    bookPreviews: bookPreviewsReducer
  }
});

export type RootState = ReturnType<typeof store["getState"]>;