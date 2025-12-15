import { createSlice } from "@reduxjs/toolkit";
interface IInitialState {
  headerMenu: boolean;
  isSignOutOpen: boolean;
}
const initialState: IInitialState = {
  headerMenu: false,
  isSignOutOpen: false,
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
  },
});
export const {
  ShowHeaderMenu,
  HideHeaderMenu,
  openSignOutPopup,
  closeSignOutPopup,
} = UISlice.actions;
export default UISlice.reducer;
