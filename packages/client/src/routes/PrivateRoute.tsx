import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../utils/hooks/dispatchHooks";

const PrivateRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to="/qr-code" />;
};

export default PrivateRoute;
