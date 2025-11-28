import { createSlice } from "@reduxjs/toolkit";
interface IInitialState {
  cartDrawerOpen: boolean;
  headerMenu: boolean;
}
const initialState: IInitialState = {
  cartDrawerOpen: false,
  headerMenu: false,
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
  },
});
export const {
  openCartDrawer,
  CloseCartDrawer,
  ShowHeaderMenu,
  HideHeaderMenu,
} = UISlice.actions;
export default UISlice.reducer;
