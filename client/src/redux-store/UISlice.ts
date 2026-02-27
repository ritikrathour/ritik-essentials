import { createSlice } from "@reduxjs/toolkit";
interface IInitialState {
  headerMenu: boolean;
  isSignOutOpen: boolean;
  isTrackOrderOpen: boolean;
  isRatingPopupOpen: boolean;
  selectedOrder: any;
}
const initialState: IInitialState = {
  headerMenu: false,
  isSignOutOpen: false,
  isTrackOrderOpen: false,
  isRatingPopupOpen: false,
  selectedOrder: null,
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
    handleSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    handleUnSelectedOrder: (state) => {
      state.selectedOrder = null;
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
  handleSelectedOrder,
  handleUnSelectedOrder,
} = UISlice.actions;
export default UISlice.reducer;
