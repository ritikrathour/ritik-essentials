import { createSlice } from "@reduxjs/toolkit";
interface IInitialState {
  cartDrawerOpen: boolean;
}
const initialState: IInitialState = {
  cartDrawerOpen: false,
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
  },
});
export const { openCartDrawer, CloseCartDrawer } = UISlice.actions;
export default UISlice.reducer;
