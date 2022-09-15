import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../common/Loader";
import { generateQrCode } from "../../reduce/action/auth/AuthAction";
import { useAppDispatch, useAppSelector } from "../../utils/dispatchHooks";

const QrCode = () => {
  const dispatch = useAppDispatch();
  const { qrcode, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(generateQrCode());
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login with QR code</h3>
        <div className="text-center m-4">
          <div>
            {isLoading ? (
              <div className="h-[180px] flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <img src={qrcode?.qrcode} alt="qr-code" />
            )}
          </div>
          <div>
            <span>Not able to login? </span>
            <Link className="text-blue-600" to={"/login"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCode;
