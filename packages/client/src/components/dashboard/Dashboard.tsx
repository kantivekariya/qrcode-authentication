import { userLogOut } from "../../reduce/action/auth/AuthAction";
import { useAppDispatch } from "../../utils/hooks/dispatchHooks";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const onHandleLogout = async () => {
    await dispatch(userLogOut());
  };
  return (
    <>
      <div>Dashboard</div>
      <button
        onClick={onHandleLogout}
        className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
      >
        Logout
      </button>
    </>
  );
};

export default Dashboard;
