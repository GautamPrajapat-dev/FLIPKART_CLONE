import React, { useEffect } from "react";
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
      <div className="grid grid-cols-12  bg-gray-50 text-black md:px-2 ">
        <div className="relative  bg-daintree-700 z-50 col-span-2 md:m-2 md:rounded-md rounded-none xl:rounded-xl">
          <DashSideBar />
        </div>
        <div className="w-full h-[100vh] lg:col-span-10 overflow-y-scroll col-span-10 p-2 rounded-lg  no-scroll">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashBordLayout;
