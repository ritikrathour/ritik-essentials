import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPROD } from "../utils/Types/Product.types";
import { WISHLIST_KEY } from "../utils/constant";
interface IWishListState {
  isAuthenticate: boolean;
  wishList: IPROD[];
  totalItems: number;
}
const initialState: IWishListState = {
  isAuthenticate: false,
  wishList: [],
  totalItems: 0,
};
export const WishListSlice = createSlice({
  name: "WishListSlice",
  initialState: initialState,

  reducers: {
    setWhisList: (state, action: PayloadAction<IWishListState>) => {
      state.isAuthenticate = action.payload.isAuthenticate;
      state.wishList = action.payload.wishList;
      state.totalItems = action.payload.totalItems;
    },
    initializeWishList: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        state.isAuthenticate = action.payload;
        const iswishList = localStorage.getItem(WISHLIST_KEY);
        if (iswishList) {
          let parsedProds = JSON.parse(iswishList);
          state.totalItems = parsedProds?.length;
          state.wishList = JSON.parse(iswishList) || initialState;
        }
      }
    },
    addToWishListLocal: (state, action: PayloadAction<IPROD>) => {
      const isProduct = state.wishList?.find(
        (item) => item?._id === action.payload?._id
      );
      if (isProduct) {
        state.wishList.filter((item) => item._id !== action.payload._id);
        state.totalItems -= 1;
        if (!state.isAuthenticate) {
          localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishList));
        }
      } else {
        state.wishList.push(action.payload);
        if (!state.isAuthenticate) {
          localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishList));
        }
      }
    },
    removeFromWishListLocal: (
      state,
      action: PayloadAction<{ prodId: string | number }>
    ) => {
      const filteredProds = state.wishList.filter(
        (item) => item._id !== action.payload.prodId
      );
      state.totalItems -= 1;
      state.wishList = filteredProds;
      if (!state.isAuthenticate) {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(state));
      }
    },
  },
});
export const {
  addToWishListLocal,
  initializeWishList,
  setWhisList,
  removeFromWishListLocal,
} = WishListSlice.actions;
export default WishListSlice.reducer;
