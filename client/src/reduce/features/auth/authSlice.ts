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

const initialStates = {
  isLoading: true,
  userInfo: {},
  error: "",
  status: "",
};

let initialState = Object.assign(persistedState, initialStates) as AuthIProps;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserLoading(state) {
      state.status = "Pending";
    },
    loginUserSuccess(state, action: PayloadAction<{}>) {
      state.isLoading = false;
      state.status = "Success";
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    loginUserFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.status = "Failed";
      state.error = action.payload;
    },
    authMeLoading(state) {
      state.status = "Pending";
    },
    authMeSuccess(state, action: PayloadAction<{}>) {
      state.isLoading = false;
      state.status = "Success";
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    authMeFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.status = "Failed";
      state.error = action.payload;
    },
    logOutLoading(state) {
      state.status = "Pending";
    },
    logOutSuccess(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.status = "Success";
      state.isAuthenticated = false;
    },
    logOutFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.status = "Failed";
      state.error = action.payload;
    },
  },
});

export const {
  loginUserLoading,
  loginUserSuccess,
  loginUserFailure,
  authMeLoading,
  authMeSuccess,
  authMeFailure,
  logOutLoading,
  logOutSuccess,
  logOutFailure,
} = authSlice.actions;

export default authSlice.reducer;
