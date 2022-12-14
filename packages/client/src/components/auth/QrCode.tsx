import { memo, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from "../../common/Loader";
import {
  generateQrCode,
  userLoginWithQRcode,
} from "../../reduce/action/auth/AuthAction";
import socket from "../../services/socketConnection";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/dispatchHooks";

const QrCode = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { qrCode, isLoading } = useAppSelector((state) => state.qrCode);

  useEffect(() => {
    const getUsers = async () => {
      socket.on("connect", () => {
        dispatch(generateQrCode({ socketId: socket.id }));
      });
    };
    getUsers();
  }, []);

  useEffect(() => {
    socket.on("authToken", (payload) => {
      dispatch(userLoginWithQRcode(payload?.token));
      navigate("/");
    });
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

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
              <img src={qrCode?.qrCode} alt="qr-code" />
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

export default memo(QrCode);
