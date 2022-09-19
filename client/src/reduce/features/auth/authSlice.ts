import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthIProps {
  userInfo: any;
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
