import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import qrCodeSlice from "../features/auth/qrCodeSlice";

const rootReducer = combineReducers({
  qrCode: qrCodeSlice,
  auth: authSlice
});

export default rootReducer;
