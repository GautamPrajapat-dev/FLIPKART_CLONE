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
      <div className="grid grid-cols-12 gap-2 px-2 text-black bg-daintree-100/25">
        <div className="col-span-2 m-2 rounded-xl bg-daintree-400">
          <DashSideBar />
        </div>
        <div className="w-full h-[99vh] lg:col-span-10 overflow-y-scroll col-span-10  p-2 rounded-lg  no-scroll">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashBordLayout;
