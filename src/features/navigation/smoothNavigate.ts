import { createAsyncThunk } from "@reduxjs/toolkit";
import { PAGE_FADE_TIMEOUT } from "src/_CONSTANTS/general";
import { PageName } from "./navigationSlice";

export const smoothNavigate = createAsyncThunk<PageName, PageName>(
  "navigation/smooth",
  async (page: PageName, {dispatch}) => {
    await new Promise<void>(ok => {
      setTimeout(() => {
        ok();
      }, PAGE_FADE_TIMEOUT);
    });
    dispatch(finishTransition());
    return page;
  }
)

export const finishTransition = createAsyncThunk<void, void>(
  "navigation/finish",
  async () => {
    await new Promise<void>(ok => setTimeout(() => ok()));
  }
)