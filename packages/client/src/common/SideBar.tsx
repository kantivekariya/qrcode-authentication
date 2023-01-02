import { Link } from "react-router-dom";
import DashboardIcon from "../assets/dashboard.svg";
import ProfileIcon from "../assets/profile.svg";

const SideBarList = [
  {
    name: "dashboard",
    icon: DashboardIcon,
    route: "/",
  },
  {
    name: "profile",
    icon: ProfileIcon,
    route: "/profile",
  },
];

const SideBar = () => {
  return (
    <aside className="bg-gradient-to-br from-blue-gray-800 to-blue-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
      <div className="relative border-b border-white/20">
        <Link className="flex items-center gap-4 py-6 px-7" to={"/"}>
          <img
            src="https://images.unsplash.com/photo-1607013251379-e6eecfffe234?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2Vyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60"
            className="inline-block relative object-cover object-center w-9 h-9 rounded-md"
          />
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            Material Tailwind React
          </h6>
        </Link>
        <button
          className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          type="button"
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-5 w-5 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </span>
        </button>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          {SideBarList.map((item, index) => (
            <Link to={item.route} key={index}>
              <button
                className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                type="button"
              >
                <img
                  src={item.icon}
                  alt="dashboardIcon"
                  height={24}
                  width={24}
                />
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  {item.name}
                </p>
              </button>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
