import { Outlet } from "react-router";
import SideBar from "../../common/SideBar";

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <SideBar />
      <div className="p-4 xl:ml-80">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
