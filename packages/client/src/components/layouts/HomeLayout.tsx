import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../utils/hooks/dispatchHooks";

const HomeLayout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
