import Loader from "../../common/Loader";
import { userLogOut } from "../../reduce/action/auth/AuthAction";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/dispatchHooks";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { userInfo, isLoading } = useAppSelector((state) => state.auth);
  const onHandleLogout = async () => {
    await dispatch(userLogOut());
  };
  return (
    <>
     <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
