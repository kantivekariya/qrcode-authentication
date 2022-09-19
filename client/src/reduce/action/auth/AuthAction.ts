import AuthApiServices from "../../../services/auth-services/AuthApiServices";
import {
  qrCodeFailure,
  qrCodeLoading,
  qrCodeSuccess,
} from "../../features/auth/qrCodeSlice";

export const generateQrCode = () => async (dispatch: any) => {
  dispatch(qrCodeLoading());
  try {
    const res = await AuthApiServices.generateQrCode();
    dispatch(qrCodeSuccess(res.data));
  } catch (error) {
    dispatch(qrCodeFailure(error as string));
    return Promise.reject(error);
  }
};

// export const loginUser = () => async (dispatch: any) => {
//   dispatch(qrCodeLoading());
//   try {
//     const res = await AuthApiServices.generateQrCode();
//     dispatch(qrCodeSuccess(res.data));
//   } catch (error) {
//     dispatch(qrCodeFailure(error as string));
//     return Promise.reject(error);
//   }
// };
