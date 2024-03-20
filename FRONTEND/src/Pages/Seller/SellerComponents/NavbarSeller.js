import React, { useEffect } from "react";
import Dropdown from "./Dropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenuOutline } from "react-icons/io5";
import useToggle from "../../../Hooks/useToggle";
import { useSelector } from "react-redux";

const NavbarSeller = () => {
  const navigate = useNavigate();
  const { isAuthantiCate } = useSelector((state) => state.Seller);

  const [toggle, setToggle] = useToggle(false);

  useEffect(() => {
    if (isAuthantiCate) {
      navigate("/seller/dasboard");
    }
  }, [isAuthantiCate, navigate]);

  return (
    <>
      <div className="py-2 text-sm border-b px-7 text-slate-400">
        Existing Seller? Explore our product recommendations with Dhamaka
        Selection
      </div>
      <div className="sticky top-0 z-10 flex justify-between px-5 bg-white shadow">
        <div className="flex items-center justify-between py-2 lg:py-3">
          <div className="flex items-center gap-5">
            <div className="">
              <img
                src="https://static-assets-web.flixcart.com/fk-sp-static/images/flipkart_logo_color_revamp.svg"
                alt=""
              />
            </div>
            {toggle && (
              <>
                <div
                  className={`fixed top-0 right-0 z-10 h-full py-4 bg-white  ${
                    toggle ? "w-80  transition" : "w-0"
                  }`}
                >
                  <div className="flex items-center justify-between px-3 pb-7">
                    <img
                      src="https://static-assets-web.flixcart.com/fk-sp-static/images/flipkart_logo_color_revamp.svg"
                      alt="https://static-assets-web.flixcart.com/fk-sp-static/images/flipkart_logo_color_revamp.svg"
                    />
                    <IoClose
                      className="text-2xl cursor-pointer"
                      onClick={() => setToggle()}
                    />
                  </div>
                  <div className="flex flex-col gap-4 text-sm divide-y lg:flex">
                    <Dropdown trigger="Sell Online" className="py-1 lg:py-auto">
                      <NavLink to="signup">Create an account</NavLink>
                      <NavLink to="signup">List Product</NavLink>
                      <NavLink to="signup">Seller App</NavLink>
                      <NavLink to="signup">Help and Support </NavLink>
                    </Dropdown>

                    <Dropdown
                      trigger="Fees and Commission"
                      className="py-1 lg:py-auto"
                    >
                      <NavLink to="signup">Create an account</NavLink>
                      <NavLink to="signup">List Product</NavLink>
                      <NavLink to="signup">Seller App</NavLink>
                      <NavLink to="signup">Help and Support </NavLink>
                    </Dropdown>

                    <Dropdown trigger="Grow" className="py-1 lg:py-auto">
                      <NavLink to="signup">Create an account</NavLink>
                      <NavLink to="signup">List Product</NavLink>
                      <NavLink to="signup">Seller App</NavLink>
                      <NavLink to="signup">Help and Support </NavLink>
                    </Dropdown>

                    <Dropdown trigger="Learn" className="py-1 lg:py-auto">
                      <NavLink to="signup">Create an account</NavLink>
                      <NavLink to="signup">List Product</NavLink>
                      <NavLink to="signup">Seller App</NavLink>
                      <NavLink to="signup">Help and Support </NavLink>
                    </Dropdown>

                    <NavLink className="px-3" to="/">
                      Shopsy
                    </NavLink>
                  </div>
                </div>
                <div
                  onClick={() => setToggle()}
                  className="fixed top-0 left-0 z-[5] w-full h-screen bg-personal-910/60"
                ></div>
              </>
            )}
            <div className="hidden gap-4 text-sm lg:flex">
              <Dropdown trigger="Sell Online">
                <NavLink to="signup">Create an account</NavLink>
                <NavLink to="signup">List Product</NavLink>
                <NavLink to="signup">Seller App</NavLink>
                <NavLink to="signup">Help and Support </NavLink>
              </Dropdown>

              <Dropdown trigger="Fees and Commission">
                <NavLink to="signup">Create an account</NavLink>
                <NavLink to="signup">List Product</NavLink>
                <NavLink to="signup">Seller App</NavLink>
                <NavLink to="signup">Help and Support </NavLink>
              </Dropdown>
              <Dropdown trigger="Grow">
                <NavLink to="signup">Create an account</NavLink>
                <NavLink to="signup">List Product</NavLink>
                <NavLink to="signup">Seller App</NavLink>
                <NavLink to="signup">Help and Support </NavLink>
              </Dropdown>
              <Dropdown trigger="Learn">
                <NavLink to="signup">Create an account</NavLink>
                <NavLink to="signup">List Product</NavLink>
                <NavLink to="signup">Seller App</NavLink>
                <NavLink to="signup">Help and Support </NavLink>
              </Dropdown>
              <NavLink to="/">Shopsy</NavLink>
            </div>
          </div>
        </div>
        <div className="flex text-sm gap-7">
          <NavLink to="login" className="self-center hidden py-3 lg:block">
            Login
          </NavLink>
          <NavLink
            to="signup"
            className="flex items-center px-4 bg-yellow-400 "
          >
            Start Selling
          </NavLink>
          <IoMenuOutline
            onClick={() => setToggle()}
            className="self-center text-2xl cursor-pointer lg:hidden"
          />
        </div>
      </div>
    </>
  );
};

export default NavbarSeller;
