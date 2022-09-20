import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadUserFromLocal } from "../../../utils/helpers";
const persistedState = loadUserFromLocal();

interface AuthIProps {
  userInfo: any;
  isAuthenticated: boolean;
  status: string;
  isLoading: boolean;
  error?: string;
}

const initialState = {
  isLoading: true,
  userInfo: {},
  error: "",
  status: "",
} as AuthIProps;

let initObjects = Object.assign(persistedState, initialState);

console.log("persistedState", initObjects);

const authSlice = createSlice({
  name: "auth",
  initObjects,
  reducers: {
    loginUserLoading(state) {
      state.status = "Pending";
    },
    loginUserSuccess(state, action: PayloadAction<{}>) {
      state.isLoading = false;
      state.status = "Success";
      state.userInfo = action.payload;
    },
    loginUserFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.status = "Failed";
      state.error = action.payload;
    },
  },
});

export const { loginUserLoading, loginUserSuccess, loginUserFailure } =
  authSlice.actions;

export default authSlice.reducer;
