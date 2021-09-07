import { configureStore } from "@reduxjs/toolkit";
import bookPreviewsReducer from "src/features/bookPreviews/bookPreviewsSlice";
import navigationReducer from "src/features/navigation/navigationSlice";
import currentBookReducer from "src/features/currentBook/currentBookSlice";

export const store = configureStore({
  reducer: {
    bookPreviews: bookPreviewsReducer,
    navigation: navigationReducer,
    currentBook: currentBookReducer
  }
});

export type RootState = ReturnType<typeof store["getState"]>;