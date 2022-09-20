import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignUpIProps {
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
} as SignUpIProps;

const signUpSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpLoading(state) {
      state.status = "Pending";
    },
    signUpSuccess(state, action: PayloadAction<{}>) {
      state.isLoading = false;
      state.status = "Success";
      state.userInfo = action.payload;
    },
    signUpFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.status = "Failed";
      state.error = action.payload;
    },
  },
});

export const { signUpLoading, signUpSuccess, signUpFailure } =
  signUpSlice.actions;

export default signUpSlice.reducer;
