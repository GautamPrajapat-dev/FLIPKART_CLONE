import { useEffect } from "react";
import DashSideBar from "./DashSideBar";
import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";
const DashBordLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = !localStorage.getItem("_token");
    if (token === undefined) {
      navigate("/seller");
    }
  }, [navigate]);

  return (
    <>
      <div className="grid grid-flow-col grid-cols-7 text-black dark:text-white dark:bg-gray-900 bg-gray-50 ">
        <div className="z-50 h-[98] col-span-1 rounded-none bg-daintree-700 md:m-2 md:rounded-md xl:rounded-xl">
          <DashSideBar />
        </div>
        <div className="w-full h-screen col-span-6 px-2 pb-2 overflow-hidden overflow-y-scroll rounded-lg lg:col-span-10 no-scroll ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashBordLayout;
