import { createSlice } from "@reduxjs/toolkit";
interface IInitialState {
  headerMenu: boolean;
  isSignOutOpen: boolean;
  isTrackOrderOpen: boolean;
  isRatingPopupOpen: boolean;
}
const initialState: IInitialState = {
  headerMenu: false,
  isSignOutOpen: false,
  isTrackOrderOpen: false,
  isRatingPopupOpen: false,
};
export const UISlice = createSlice({
  name: "UISlice",
  initialState,
  reducers: {
    ShowHeaderMenu: (state) => {
      state.headerMenu = true;
    },
    HideHeaderMenu: (state) => {
      state.headerMenu = false;
    },
    openSignOutPopup: (state) => {
      state.isSignOutOpen = true;
    },
    closeSignOutPopup: (state) => {
      state.isSignOutOpen = false;
    },
    openTrackOrderPopup: (state) => {
      state.isTrackOrderOpen = true;
    },
    closeTrackOrderPopup: (state) => {
      state.isTrackOrderOpen = false;
    },
    openRatingPopup: (state) => {
      state.isRatingPopupOpen = true;
    },
    closeRatingPopup: (state) => {
      state.isRatingPopupOpen = false;
    },
  },
});
export const {
  openRatingPopup,
  closeRatingPopup,
  ShowHeaderMenu,
  HideHeaderMenu,
  openSignOutPopup,
  closeSignOutPopup,
  openTrackOrderPopup,
  closeTrackOrderPopup,
} = UISlice.actions;
export default UISlice.reducer;
