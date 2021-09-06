import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBookVolumesResponse } from "src/api/bookPreviews";
import { CategoryName } from "src/types/Category";
import { GoogleAPIBookVolumes, Volume } from "src/types/GoogleAPI";
import { OrderByName } from "src/types/OrderByName";
import { mapAPIToLocal } from "src/utils/mapAPIToLocal";
import { FetchLoadMoreThunk_Return } from "./bookPreviewsSlice";

interface ThunkArgs {
  query: string;
  category: CategoryName;
  order: OrderByName;

  startIndex: number;
  /** Добавляем возможность передавать из стейта на случай, если захотим настраивать пагинацию динамически */
  maxResults?: number;
}

export const fetchLoadMoreBooks = createAsyncThunk<FetchLoadMoreThunk_Return, ThunkArgs, { rejectValue: string }>(
  "bookPreviews/loadMore",
  async ({query, category, order, startIndex, maxResults}: ThunkArgs, {rejectWithValue}) => {
    try {
      const response = await getBookVolumesResponse({
        query, category, order, startIndex, maxResults
      });
      if (!response.ok) {
        const errorResponseBody = await response.json();
        console.log(errorResponseBody);
        throw new Error();
      }

      const data: GoogleAPIBookVolumes = await response.json();

      return {
        list: data.items.map((volume: Volume) => mapAPIToLocal(volume)),
        foundCount: data.totalItems
      }
    }
    catch (e) {
      return rejectWithValue("Failed to load more books =(");
    }
  }
)