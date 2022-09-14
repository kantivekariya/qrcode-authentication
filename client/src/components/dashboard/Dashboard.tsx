import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const onHandleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
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
