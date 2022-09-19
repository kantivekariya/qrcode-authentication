import { combineReducers } from "@reduxjs/toolkit";
import qrCodeSlice from "../features/auth/qrCodeSlice";

const rootReducer = combineReducers({
  qrCode: qrCodeSlice,
});

export default rootReducer;
