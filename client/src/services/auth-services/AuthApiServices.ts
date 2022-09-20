import { AUTH_URLS } from "../../constant/urlConstant";
import { LoginIProps, SignUpIProps } from "../../reduce/action/auth/AuthAction";
import { apiService } from "../apiServices";

const AuthApiServices = {
  generateQrCode: () => apiService.getData(AUTH_URLS.QR_CODE_URL),
  userLogin: (apiData: LoginIProps) =>
    apiService.postData(AUTH_URLS.LOGIN_URL, apiData),
  userSignUp: (apiData: SignUpIProps) =>
    apiService.postData(AUTH_URLS.SIGNUP_URL, apiData),
};
export default AuthApiServices;
