import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAddToCartPayload,
  ICart,
  ICartItem,
  ICartState,
  IUpdateCartItemPayload,
} from "../utils/Types/Cart.types";
import { CART_KEY } from "../utils/constant";
const initialCart: ICart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};
const initialState: ICartState = {
  Cart: initialCart,
  isCartDrawerOpen: false,
  isLoading: false,
  error: null,
  isAuthenticate: false,
};
// calculateTotals
const calculateTotals = (items: ICartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { totalItems, totalPrice };
};
export const CartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    openCartDrawer: (state) => {
      state.isCartDrawerOpen = true;
    },
    CloseCartDrawer: (state) => {
      state.isCartDrawerOpen = false;
    },
    initializeCartLocal: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticate = action.payload;
      if (!action.payload) {
        const isCart = localStorage.getItem(CART_KEY);
        if (isCart) {
          state.Cart = JSON.parse(isCart) || initialCart;
        }
      }
    },
    setCart: (state, action: PayloadAction<ICart>) => {
      state.Cart = action.payload;
      state.error = null;
    },
    addToCartLocal: (state, action: PayloadAction<IAddToCartPayload>) => {
      const existItem = state.Cart?.items?.find(
        (item: ICartItem) => item?.productId === action.payload.productId
      );
      if (existItem) {
        existItem.quantity += action.payload.quantity;
      } else {
        state.Cart.items.push({
          _id: Date.now().toString(),
          productId: action.payload.productId,
          quantity: action.payload.quantity,
          image: action.payload.imageUrl || "",
          name: action.payload.name,
          price: action.payload.price,
        });
      }
      const totals = calculateTotals(state.Cart.items);
      state.Cart.totalItems = totals.totalItems;
      state.Cart.totalPrice = totals.totalPrice;
      if (!state.isAuthenticate) {
        localStorage.setItem(CART_KEY, JSON.stringify(state.Cart));
      }
    },
    updateCartItemLocal: (
      state,
      action: PayloadAction<IUpdateCartItemPayload>
    ) => {
      const { cartItemId, quantity } = action.payload;
      if (quantity > 0) {
        const item = state.Cart.items.find((i) => i._id === cartItemId);
        if (item) item.quantity = quantity;
      }
      const totals = calculateTotals(state.Cart.items);
      state.Cart.totalItems = totals.totalItems;
      state.Cart.totalPrice = totals.totalPrice;
      if (!state.isAuthenticate)
        localStorage.setItem(CART_KEY, JSON.stringify(state.Cart));
    },
    removeCartItemLocal: (state, action: PayloadAction<{ itemId: string }>) => {
      const items = state.Cart.items.filter(
        (item) => item._id !== action.payload.itemId
      );
      state.Cart.items = items;
      const { totalItems, totalPrice } = calculateTotals(items);
      state.Cart.totalItems = totalItems;
      state.Cart.totalPrice = totalPrice;
      if (!state.isAuthenticate) {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
        setCart(state.Cart);
      }
    },
    clearCartLocal: (state) => {
      state.Cart = initialCart;
      if (!state.isAuthenticate) {
        localStorage.removeItem(CART_KEY);
      }
    },
  },
});
export const {
  openCartDrawer,
  CloseCartDrawer,
  initializeCartLocal,
  addToCartLocal,
  setCart,
  updateCartItemLocal,
  removeCartItemLocal,
  clearCartLocal,
} = CartSlice.actions;
export default CartSlice.reducer;
