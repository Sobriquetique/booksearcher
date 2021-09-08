import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetchFullVolumeResponse } from "src/api/bookFull";
import { BookFull } from "src/types/BookFull";
import { GoogleAPI_VolumeFull } from "src/types/GoogleAPI";
import { mapAPIVolumeToLocal } from "src/utils/mapAPIToLocal";
import { CachedBooks } from "./currentBookSlice";

interface ThunkArgs {
  cachedBooks: CachedBooks;
  idToFetch: string;
}

export const fetchBookOrGetCached = createAsyncThunk<BookFull, ThunkArgs, { rejectValue: string }>(
  "currentBook/fetch",
  async ({cachedBooks, idToFetch}: ThunkArgs, {rejectWithValue}) => {
    try {
      const cached = cachedBooks[idToFetch];
      if (cached) {
        return cached;
      }

      const response = await getFetchFullVolumeResponse(idToFetch);
      if (!response.ok) {
        response.json().then(errBody => console.error(errBody));
        throw new Error(`Server responded with status ${response.status}`);
      }

      const volume = await response.json() as GoogleAPI_VolumeFull;
      return mapAPIVolumeToLocal(volume);
    }
    catch (err) {
      let message = "Unknown error"
      if (err instanceof Error && err.message) {
        message = err.message;
      }
      return rejectWithValue(message);
    }
  }
);