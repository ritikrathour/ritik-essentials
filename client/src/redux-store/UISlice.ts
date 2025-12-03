import { createSlice } from "@reduxjs/toolkit";
interface IInitialState {
  cartDrawerOpen: boolean;
  headerMenu: boolean;
  isSignOutOpen: boolean;
}
const initialState: IInitialState = {
  cartDrawerOpen: false,
  headerMenu: false,
  isSignOutOpen: false,
};
export const UISlice = createSlice({
  name: "UISlice",
  initialState,
  reducers: {
    openCartDrawer: (state) => {
      state.cartDrawerOpen = true;
    },
    CloseCartDrawer: (state) => {
      state.cartDrawerOpen = false;
    },
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
  openCartDrawer,
  CloseCartDrawer,
  ShowHeaderMenu,
  HideHeaderMenu,
  openSignOutPopup,
  closeSignOutPopup,
} = UISlice.actions;
export default UISlice.reducer;
