import React, { useEffect } from "react";
import {
  BiBox,
  BiHomeAlt2,
  BiNotification,
  BiSolidInbox,
} from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { getTokenLocalStorageSeller } from "../../../../Utils/LocalStorage";
const links = [
  {
    to: "main",
    name: "DashBoard",
    icon: <BiHomeAlt2 />,
  },
  {
    to: "inbox",
    name: "Inbox",
    icon: <BiNotification />,
  },
  {
    to: "products",
    name: "Products",
    icon: <BiBox />,
  },
  {
    to: "addnewproducts",
    name: "Add New Products",
    icon: <BiSolidInbox />,
  },
];

const DashSideBar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!!getTokenLocalStorageSeller() === false) {
      navigate("/seller");
    }
  }, [navigate]);
  return (
    <>
      <main className="">
        <div className="mx-3 mt-5 ">
          <div className="pb-4 border-b border-personal-20/30 ">
            <img
              className="lg:w-1/3 image-full"
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
              alt=""
            />
          </div>
          <ul className="flex flex-col gap-3 mt-3">
            {links.map((links, i) => {
              return (
                <div className="" key={i}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "active-class flex py-2 px-2 rounded-lg btn glass   lg:justify-start backdrop-blur-xl bg-purple-200/20 items-center gap-3  text-xs xl:text-base text-white   tooltip   tooltip-right"
                        : "inactive-class flex py-2 px-2 rounded-lg btn lg:justify-start items-center gap-3 text-white  btn-ghost  text-xs  tooltip tooltip-right xl:text-base"
                    }
                    to={links.to}
                    data-tip={links.name}
                  >
                    <div className="text-lg">{links.icon}</div>
                    <span className="hidden lg:block">{links.name}</span>
                  </NavLink>
                </div>
              );
            })}
          </ul>
        </div>
      </main>
    </>
  );
};

export default DashSideBar;
