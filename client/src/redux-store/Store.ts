import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./User.slice";
import { UISlice } from "./UISlice";

export const store = configureStore({
  reducer: { user: userSlice.reducer, ui: UISlice.reducer },
});
// 👇 Export typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
