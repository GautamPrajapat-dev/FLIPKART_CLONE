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
      <div className="grid grid-cols-12 text-black bg-gray-50 md:px-2 ">
        <div className="relative z-50 col-span-2 rounded-none bg-daintree-700 md:m-2 md:rounded-md xl:rounded-xl">
          <DashSideBar />
        </div>
        <div className="w-full h-[100vh] lg:col-span-10 px-2 overflow-y-scroll col-span-10 pb-2 rounded-lg  no-scroll">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashBordLayout;
