import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBookVolumesResponse } from "src/api/bookPreviews";
import { CategoryName } from "src/types/Category";
import { GoogleAPIBookVolumes } from "src/types/GoogleAPI";
import { OrderByName } from "src/types/OrderByName";
import { mapAPIPreviewsToLocal } from "src/utils/mapAPIToLocal";
import { FetchBookPreviewsThunk_Return } from "./bookPreviewsSlice";

interface ThunkArgs {
  query: string;
  category: CategoryName;
  order: OrderByName;

  /** Добавляем возможность передавать из стейта на случай, если захотим настраивать пагинацию динамически */
  maxResults?: number;
}

/** Фетчит книги с нуля. Обнулить current list книг и засунуть туда этот в экстра редусерах. */
export const fetchFreshBookPreviews = createAsyncThunk<FetchBookPreviewsThunk_Return, ThunkArgs, { rejectValue: string }>(
  "bookPreviews/fetch",
  async ({query, category, order, maxResults}: ThunkArgs, {rejectWithValue}) => {
    try {
      const response = await getBookVolumesResponse({
        query, category, order, startIndex: 0, maxResults
      });
      if (!response.ok) {
        const errorResponseBody = await response.json();
        console.log(errorResponseBody);
        throw new Error();
      }

      const data: GoogleAPIBookVolumes = await response.json();

      return {
        list: mapAPIPreviewsToLocal(data.items),
        foundCount: data.totalItems,
        newCategory: category,
        newOrder: order,
        newQuery: query
      }
      
    }
    catch (e) {
      return rejectWithValue("Failed to fetch books =(");
    }
  }
)

/** Get standart data fetching thunk */
// export function getStandartThunk<TData, TArgs>(typePrefix: string, fetcher: (...args: )) {
//   return createAsyncThunk<TData, TArgs, { rejectValue: Error}>(
//     typePrefix,
//     () => {

//     }
//   )
// }