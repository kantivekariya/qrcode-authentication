import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import qrCodeSlice from "../features/auth/qrCodeSlice";
import signUpSlice from "../features/auth/signUpSlice";

const rootReducer = combineReducers({
  qrCode: qrCodeSlice,
  auth: authSlice,
  signup: signUpSlice,
});

export default rootReducer;
