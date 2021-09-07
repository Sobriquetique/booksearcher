import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { smoothNavigate } from "./smoothNavigate";

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

const {reducer, actions} = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setReveal: (_, {payload}: PayloadAction<PageName>) => ({
      currentPage: payload,
      status: "REVEAL"
    })
  },
  extraReducers: builder => {
    builder.addCase(smoothNavigate.pending, (state: NavigationState) => ({
      ...state,
      status: "FADE" as NavigationStatus
    }));
    
    builder.addCase(smoothNavigate.fulfilled, (state: NavigationState) => ({
      ...state,
      status: "IDLE" as NavigationStatus
    }))
  }
});

export default reducer;
export const {setReveal} = actions;

export const useNavigation = (): RootState["navigation"] => useSelector((state: RootState) => state.navigation);

