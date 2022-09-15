import { AUTH_URLS } from "../../constant/urlConstant";
import { apiService } from "../apiServices";

const AuthApiServices = {
  generateQrCode: () => apiService.getData(AUTH_URLS.QR_CODE),
};
export default AuthApiServices;
