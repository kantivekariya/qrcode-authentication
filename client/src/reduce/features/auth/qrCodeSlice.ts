import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthIProps {
  qrCode: any;
  status: string;
  isLoading: boolean;
  error?: string;
}

const initialState = {
  isLoading: true,
  qrCode: {},
  error: "",
  status: "",
} as AuthIProps;

const qrCodeSlice = createSlice({
  name: "qrCode",
  initialState,
  reducers: {
    qrCodeLoading(state) {
      state.status = "Pending";
    },
    qrCodeSuccess(state, action: PayloadAction<{}>) {
      state.isLoading = false;
      state.status = "Success";
      state.qrCode = action.payload;
    },
    qrCodeFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.status = "Failed";
      state.error = action.payload;
    },
  },
});

export const { qrCodeLoading, qrCodeSuccess, qrCodeFailure } =
  qrCodeSlice.actions;

export default qrCodeSlice.reducer;
