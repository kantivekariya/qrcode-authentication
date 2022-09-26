import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import AuthApiServices from "../../../services/auth-services/AuthApiServices";
import { getLocalState, setLocalState } from "../../../utils/helpers";
import {
  authMeFailure,
  authMeLoading,
  authMeSuccess,
  loginUserFailure,
  loginUserLoading,
  loginUserSuccess,
  loginUserWithQRcodeFailure,
  loginUserWithQRcodeLoading,
  loginUserWithQRcodeSuccess,
  logOutLoading,
  logOutSuccess,
} from "../../features/auth/authSlice";
import {
  qrCodeFailure,
  qrCodeLoading,
  qrCodeSuccess,
} from "../../features/auth/qrCodeSlice";
import {
  signUpFailure,
  signUpLoading,
  signUpSuccess,
} from "../../features/auth/signUpSlice";

export interface LoginIProps {
  email: string;
  password: string;
}

export interface SignUpIProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  password: string;
}

export interface SocketIProps {
  socketId: string;
}

/* generate qrCode api's */
export const generateQrCode = (socketId: SocketIProps) => async (dispatch: any) => {
  dispatch(qrCodeLoading());
  try {
    const res = await AuthApiServices.generateQrCode(socketId);
    dispatch(qrCodeSuccess(res.data));
  } catch (error) {
    dispatch(qrCodeFailure(error as string));
    return Promise.reject(error);
  }
};

/* user login api's */
export const userLogin = (apiData: LoginIProps) => async (dispatch: any) => {
  dispatch(loginUserLoading());
  try {
    const res = await AuthApiServices.userLogin(apiData);
    const decoded = jwt_decode(res?.data?.token);
    // @ts-ignore
    saveTokens({ access_token: res?.data?.token, expires_in: decoded.exp });
    dispatch(loginUserSuccess(res.data));
    toast.success(res?.data?.message);
  } catch (error) {
    dispatch(loginUserFailure(error as string));
    return Promise.reject(error);
  }
};

/* user login api's */
export const userLoginWithQRcode = (token:string) => async (dispatch: any) => {
  dispatch(loginUserWithQRcodeLoading());
  try {
    const decoded = jwt_decode(token);
    // @ts-ignore
    saveTokens({ access_token: token, expires_in: decoded.exp });
    dispatch(loginUserWithQRcodeSuccess());
  } catch (error) {
    dispatch(loginUserWithQRcodeFailure(error as string));
    return Promise.reject(error);
  }
};

/* user signup api's */
export const userSignUp = (apiData: SignUpIProps) => async (dispatch: any) => {
  dispatch(signUpLoading());
  try {
    const res = await AuthApiServices.userSignUp(apiData);
    dispatch(signUpSuccess(res.data));
  } catch (error) {
    dispatch(signUpFailure(error as string));
    return Promise.reject(error);
  }
};

/* get user profile api's */
export const getUserProfile = () => async (dispatch: any) => {
  dispatch(authMeLoading());
  try {
    const res = await AuthApiServices.loginUserProfile();
    dispatch(authMeSuccess(res.data));
  } catch (error) {
    dispatch(authMeFailure(error as string));
    return Promise.reject(error);
  }
};

/* user logout api's */
export const userLogOut = () => async (dispatch: any) => {
  dispatch(logOutLoading());
  try {
    const res = await AuthApiServices.userLogOut();
    dispatch(logOutSuccess(res.data));
    localStorage.clear();
  } catch (error) {
    dispatch(loginUserFailure(error as string));
    return Promise.reject(error);
  }
};

export const saveTokens = (params: {
  access_token: string;
  expires_in: number;
}) => {
  const { access_token, expires_in } = params;
  const expires_at = new Date();
  expires_at.setSeconds(expires_at.getSeconds() + expires_in);
  setLocalState("expires_in", expires_in);
  setLocalState("expires_at", expires_at.getTime());
  setLocalState("access_token", access_token);
};

export const onLocalLogin = () => {
  return (dispatch: any) => {
    const _expiresAt = getLocalState("expires_at");
    const access_token = getLocalState("access_token");
    if (
      _expiresAt &&
      access_token &&
      new Date().getTime() < parseInt(_expiresAt)
    ) {
      // authorize
      console.log("onLocalLogin - authorize");
      return dispatch(getUserProfile());
    } else {
      //unauth
      console.log("onLocalLogin - unauth");
      localStorage.clear();
    }
  };
};
