import { AUTH_URLS } from "../../constant/urlConstant";
import { LoginIProps, SignUpIProps, SocketIProps } from "../../reduce/action/auth/AuthAction";
import { apiService } from "../apiServices";

const AuthApiServices = {
  generateQrCode: (socketId: SocketIProps) =>
    apiService.postData(AUTH_URLS.QR_CODE_URL, socketId),
  userLogin: (apiData: LoginIProps) =>
    apiService.postData(AUTH_URLS.LOGIN_URL, apiData),
  userSignUp: (apiData: SignUpIProps) =>
    apiService.postData(AUTH_URLS.SIGNUP_URL, apiData),
  loginUserProfile: () => apiService.getData(AUTH_URLS.AUTH_ME_URL),
  userLogOut: () => apiService.getData(AUTH_URLS.LOGOUT_URL),
};
export default AuthApiServices;
