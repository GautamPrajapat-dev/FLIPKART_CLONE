import React from "react";
import {
  IoBagAddOutline,
  IoBagOutline,
  IoCartOutline,
  IoClose,
  IoHelp,
  IoMenu,
  IoNewspaperOutline,
} from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";
import { LuSearch, LuUser2 } from "react-icons/lu";
import { MdOutlineDiscount, MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineShop } from "react-icons/ai";
import useToggle from "../../../../Hooks/useToggle";
import Button from "../../../../Components/Buttons/Button";

import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  IoIosArrowForward,
  IoMdHeart,
  IoMdNotificationsOutline,
} from "react-icons/io";
const Navbar = () => {
  const navigate = useNavigate();
  const [toggle, toggler] = useToggle(false);
  const navList = [
    {
      link: "All Catagories",
      icon: <CiBoxes />,
      to: "/catagories",
    },
    {
      link: "Trending Stores",
      icon: <AiOutlineShop />,
      to: "/topstores",
    },
    {
      link: "Offer Zone",
      icon: <MdOutlineLocalOffer />,
      to: "/offers",
    },
    {
      link: "Sell On Flipkart",
      icon: <IoBagOutline />,
      to: "/seller",
    },
    {
      link: "My Orders",
      icon: <IoBagAddOutline />,
      to: "/my-orders",
    },
    {
      link: "Coupons",
      icon: <MdOutlineDiscount />,
      to: "/coupons",
    },
    {
      link: "My Cart",
      icon: <IoCartOutline />,
      to: "/cart",
    },
    {
      link: "My Whitelist",
      icon: <IoMdHeart />,
      to: "/whitelist",
    },
    {
      link: "My Account",
      icon: <LuUser2 />,
      to: "/my-account",
    },
    {
      link: "My Notifications",
      icon: <IoMdNotificationsOutline />,
      to: "/notification",
    },
    {
      link: "Help Center",
      icon: <IoHelp />,
      to: "/help-center",
    },
    {
      link: "Legal",
      icon: <IoNewspaperOutline />,
      to: "/legal",
    },
  ];
  return (
    <>
      <header className="relative top-0 z-10 flex items-center justify-between gap-6 px-2 py-1 lg:sticky lg:justify-start lg:pl-36 bg-mariner-100 text-daintree-950 dark:bg-daintree-500 dark:text-daintree-50">
        <div className="flex items-center">
          <Button
            onClick={toggler}
            className="z-10 block pl-2 bg-transparent lg:hidden"
          >
            <IoMenu className="text-3xl text-personal-910" />
          </Button>
          <img
            onClick={() => navigate("/")}
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
            alt="logo"
            className="cursor-pointer -ml-9 lg:m-auto"
          />
        </div>

        <div className="items-center hidden w-3/6 lg:flex">
          <div className="absolute px-2">
            <LuSearch />
          </div>
          <input
            className="w-full py-2 pl-8 rounded-md focus:outline-none"
            type="search"
            placeholder="type a search"
          />
        </div>
        <nav className="">
          <ul className="flex items-center gap-5 text-1xl">
            <li
            // className="tooltip hover:tooltip-open tooltip-bottom"
            // data-tip="Login"
            >
              <NavLink
                to="/login"
                className={`flex hover:text-personal-10 hover:bg-personal-900  rounded items-center  gap-2  pl-2`}
              >
                <div className="text-2xl">
                  <LuUser2 />
                </div>
                <div className="px-3 py-2 rounded dropdown dropdown-end dropdown-hover">
                  <div
                    tabIndex={0}
                    role="button"
                    className="relative flex items-center m-1 text-lg peer-hover:-rotate-90 hover:text-personal-10"
                  >
                    Login
                    <IoIosArrowForward className="rotate-90 peer" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content bg-mariner-100 text-black z-[1] menu p-2 shadow   rounded-box w-52 "
                  >
                    <li>
                      <Link to={"/login"}>SignIn</Link>
                    </li>
                    <li>
                      <Link to={"/signup"}>Signup</Link>
                    </li>
                  </ul>
                </div>
              </NavLink>
            </li>
            <li
              className="tooltip hover:tooltip-open tooltip-bottom"
              data-tip="Cart"
            >
              <NavLink
                to="/cart"
                className={`flex items-center gap-2 text-lg `}
              >
                <div className="text-2xl">
                  <IoCartOutline />
                </div>
                <div className="hidden md:block">Cart</div>
              </NavLink>
            </li>

            <div>
              <li
                className="hidden md:flex tooltip hover:tooltip-open tooltip-bottom"
                data-tip="Become a Seller"
              >
                <NavLink
                  to="/seller"
                  className={`flex items-center gap-2 text-lg `}
                >
                  <div className="text-2xl">
                    <AiOutlineShop />
                  </div>
                  <div className="hidden md:block ">Become a Seller</div>
                </NavLink>
              </li>
            </div>

            {toggle && (
              <>
                <div
                  onClick={toggler}
                  className="fixed top-0 left-0 z-10 w-full h-screen bg-personal-910/60"
                ></div>
                <div
                  className={`absolute  top-0 left-0  h-screen bg-mariner-100   
             border-r-2 ease-in duration-1000  delay-1000 rounded-r-xl shadow-2xl border-personal-900/40 z-20 ${
               toggle ? "w-80  transition" : "w-0"
             }`}
                >
                  {/* <div className="font-semibold text-1xl text-mariner-500">
                      Hellow User
                    </div> */}
                  <div
                    onClick={toggler}
                    className="absolute top-0 px-1 py-2 right-1"
                  >
                    <IoClose className="text-2xl " />
                  </div>
                  <div className="flex items-center gap-2 mx-2 my-4 ">
                    <div className="flex items-center gap-3 overflow-hidden avatar">
                      <div className="rounded-full">
                        <div className="flex items-center justify-center w-12 h-12 bg-black">
                          <span className="text-xl text-personal-10">G</span>
                          {/* <img
                            src="https://rukminim2.flixcart.com/image/312/312/xif0q/dslr-camera/i/o/c/eos-r100-24-1-eos-r100-kit-canon-original-imagqeydhsxgacxp.jpeg?q=70"
                            className="bg-center "
                            alt="img"
                            width="100%"
                          /> */}
                        </div>
                      </div>
                    </div>
                    {/* sidebar text or list */}
                    <div>
                      <h1 className="text-xl font-semibold">Gautam Prajapat</h1>
                    </div>
                  </div>
                  {/* list */}
                  <nav className="flex flex-col gap-4 ml-3 text-lg capitalize">
                    {navList.map((item, index) => {
                      return (
                        <>
                          <ul className="flex items-center even:divide-y divide-personal-900/20">
                            <span className="font-semibold">{item.icon}</span>
                            <NavLink className="pl-3 " to={item.to}>
                              {item.link}
                            </NavLink>
                          </ul>
                        </>
                      );
                    })}
                  </nav>
                </div>
              </>
            )}
          </ul>
        </nav>
      </header>

      <div className="sticky top-0 items-center w-full px-2 py-2 z-[5] bg-mariner-100 lg:hidden">
        <div className="absolute px-2 py-3 ">
          <LuSearch />
        </div>
        <input
          className="w-full py-2 pl-8 focus:outline-none"
          type="search"
          placeholder="type a search"
        />
      </div>
    </>
  );
};

export default Navbar;
