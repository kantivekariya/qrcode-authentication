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
      <div className="grid h-screen place-items-center">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div>Wel Come {`${userInfo?.data?.firstName} ${userInfo?.data?.lastName}` }</div>
            <button
              onClick={onHandleLogout}
              className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
