import { configureStore } from "@reduxjs/toolkit";
import bookPreviewsReducer from "src/features/bookPreviews/bookPreviewsSlice";
import navigationReducer from "src/features/navigation/navigationSlice";

export const store = configureStore({
  reducer: {
    bookPreviews: bookPreviewsReducer,
    navigation: navigationReducer
  }
});

export type RootState = ReturnType<typeof store["getState"]>;