import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBookVolumesResponse } from "src/api/bookPreviews";
import { CategoryName } from "src/types/Category";
import { GoogleAPIBookVolumes, Volume } from "src/types/GoogleAPI";
import { OrderByName } from "src/types/OrderByName";
import { mapAPIToLocal } from "src/utils/mapAPIToLocal";
import { FetchBookPreviewsThunk_Return } from "./bookPreviewsSlice";

interface ThunkArgs {
  query: string;
  category: CategoryName;
  order: OrderByName;
}

/** Фетчит книги с нуля. Обнулить current list книг и засунуть туда этот в экстра редусерах. */
export const fetchFreshBookPreviews = createAsyncThunk<FetchBookPreviewsThunk_Return, ThunkArgs, { rejectValue: string }>(
  "bookPreviews/fetch",
  async ({query, category, order}: ThunkArgs, {rejectWithValue}) => {
    try {
      const response = await getBookVolumesResponse(query, category, order);
      if (!response.ok) {
        const errorResponseBody = await response.json();
        console.log(errorResponseBody);
        throw new Error();
      }

      const data: GoogleAPIBookVolumes = await response.json();

      return {
        list: data.items.map((volume: Volume) => mapAPIToLocal(volume)),
        foundCount: data.totalItems,
        newCategory: category,
        newOrder: order
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