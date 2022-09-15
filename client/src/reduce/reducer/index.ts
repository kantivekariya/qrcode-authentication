import { combineReducers } from "@reduxjs/toolkit";
import userAuthSlice from "../features/auth/authSlice";

const rootReducer = combineReducers({
  auth: userAuthSlice,
});

export default rootReducer;
