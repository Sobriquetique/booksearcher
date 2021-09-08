import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { finishTransition, smoothNavigate } from "./smoothNavigate";

export type PageName = "previews" | "book";
export type NavigationStatus = "IDLE" | "FADE" | "REVEAL";

interface NavigationState {
  currentPage: PageName;
  status: NavigationStatus;
}

const initialState: NavigationState = {
  currentPage: "previews",
  status: "IDLE"
}

const {reducer} = createSlice({
  name: "navigation",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(smoothNavigate.pending, (state: NavigationState) => {
      state.status = "FADE";
    });
    
    builder.addCase(smoothNavigate.fulfilled, (state: NavigationState, {payload}: PayloadAction<PageName>) => {
      state.status = "REVEAL";
      state.currentPage = payload;
    });

    builder.addCase(finishTransition.fulfilled, (state: NavigationState) => {
      state.status = "IDLE";
    })
  }
});

export default reducer;

export const useNavigation = (): RootState["navigation"] => useSelector((state: RootState) => state.navigation);

