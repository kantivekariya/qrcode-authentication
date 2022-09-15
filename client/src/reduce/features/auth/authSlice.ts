import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthIProps {
  qrcode: any;
  status: string;
  isLoading: boolean;
  error?: string;
}

const initialState = {
  isLoading: true,
  qrcode: {},
  error: "",
  status: "",
} as AuthIProps;

const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    qrCodeLoading(state) {
      state.status = "Pending";
    },
    qrCodeSuccess(state, action: PayloadAction<{}>) {
      state.isLoading = false;
      state.status = "Success";
      state.qrcode = action.payload;
    },
    qrCodeFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.status = "Failed";
      state.error = action.payload;
    },
  },
});

export const { qrCodeLoading, qrCodeSuccess, qrCodeFailure } =
  userAuthSlice.actions;

export default userAuthSlice.reducer;
