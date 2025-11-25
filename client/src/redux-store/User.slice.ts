import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../utils/Types/Auth.types";
// Async thunk for API calls
// refresh token api call can be added here if needed
// const refreshToken = async () => {
//   try {
//     const response = await AxiosInstense.post("/refresh-token", {});
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// // fetchUser
// export const fetchUser = createAsyncThunk(
//   "user/fetchUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await AxiosInstense.get(`user`);
//       return response.data;
//     } catch (error: AxiosError | any) {
//       if (error?.response && error?.response.status === 401) {
//         try {
//           // 1. Refresh token
//           await refreshToken();
//           // Retry the failed request
//           const response = await AxiosInstense.get(`/user`);
//           return response.data;
//         } catch (error) {
//           throw error; // Let the outer catch handle this
//         }
//       }
//       return rejectWithValue(
//         error?.response?.data?.message || "Something went wrong"
//       );
//     }
//   }
// );
// type
export interface IInitialState {
  user: IUser | null;
  error: any;
  loading: boolean;
  isAuthenticated: boolean;
}
// intialState
const initialState: IInitialState = {
  user: null, // logged-in user data
  error: null,
  loading: false,
  isAuthenticated: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loading = true;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null; // Clear user data on logout
    },
  },

  // extraReducers: (builder) => {
  //
  // },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
