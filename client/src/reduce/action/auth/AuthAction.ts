import AuthApiServices from "../../../services/auth-services/AuthApiServices";

export const generateQrCode = () => {
  return async (dispatch: any) => {
    try {
      const response = await AuthApiServices.generateQrCode();
      console.log(response);
    } catch (e) {
      //       displayErrors(e);
    }
  };
};
