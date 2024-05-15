import {
  ChartBarIcon,
  MusicalNoteIcon,
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/16/solid";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function AdminSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToStatistic = () => {
    navigate("/statistic");
  };
  const navigateToSong = () => {
    navigate("/manage/songs");
  };
  const navigateToUser = () => {
    navigate("/manage/users");
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");

    dispatch({ type: "user/logout" });

    navigate("/");
  };

  return (
    <>
      <div className="bg-black hidden lg:block">
        <div
          className="m-2 sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-1/5 overflow-y-auto text-center bg-zinc-800"
          style={{ borderRadius: "10px" }}
        >
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
              <img
                className="mx-0 h-8 w-auto"
                src="https://res.cloudinary.com/droondbdu/image/upload/v1711204053/v940-bb-ju-26-removebg-preview_1_r8eb2g.png"
                alt="Your Company"
              />
              <h1 className="font-bold text-gray-200 text-[15px] ml-3">
                Musical Music
              </h1>
              <i className="bi bi-x cursor-pointer ml-28 lg:hidden" />
            </div>
            <div className="my-2 bg-gray-600 h-[1px]" />
          </div>

          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={() => navigateToStatistic()}
          >
            <ChartBarIcon className="w-8 mx-0" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Statistics
            </span>
          </div>
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={() => navigateToSong()}
          >
            <MusicalNoteIcon className="w-8 mx-0" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Songs
            </span>
          </div>
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={() => navigateToUser()}
          >
            <UserIcon className="w-8 mx-0" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Users
            </span>
          </div>
          <div className="my-4 bg-gray-600 h-[1px]" />
          <div
            onClick={handleLogout}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          >
            <ArrowLeftStartOnRectangleIcon className="w-8 mx-0" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Logout
            </span>
          </div>
        </div>
      </div>
    </>
  );
}