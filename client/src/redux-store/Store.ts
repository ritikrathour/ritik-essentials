import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./User.slice";
import { UISlice } from "./UISlice";
import { CartSlice } from "./CartSlice";
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ui: UISlice.reducer,
    cart: CartSlice.reducer,
  },
});
// 👇 Export typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
