import { createAsyncThunk } from "@reduxjs/toolkit";
import { PAGE_FADE_TIMEOUT } from "src/_CONSTANTS/general";
import { PageName, setReveal } from "./navigationSlice";

export const smoothNavigate = createAsyncThunk<void, PageName>(
  "navigation/smooth",
  async (page: PageName, {dispatch}) => {
    await new Promise<void>((ok) => {
      setTimeout(() => {
        dispatch(setReveal(page));
        ok();
      }, PAGE_FADE_TIMEOUT)
    });
    return;
  }
)