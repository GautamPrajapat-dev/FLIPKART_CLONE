import { useEffect } from "react";
import {
  IoBagAddOutline,
  IoBagOutline,
  IoCartOutline,
  IoClose,
  IoHelp,
  IoLogOutOutline,
  IoMenu,
  IoNewspaperOutline,
} from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiBoxes } from "react-icons/ci";
import { LuSearch, LuUser2 } from "react-icons/lu";
import { MdOutlineDiscount, MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineShop } from "react-icons/ai";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdHeart, IoMdNotificationsOutline } from "react-icons/io";
import {
  clearTokenLocalStoragePublic,
  getTokenLocalStoragePublic,
} from "../../../Utils/LocalStorage.jsx";
import { PUBLIC_PROFILE_SAGA } from "../../../Stores/Slice/Public.Auth.Slice.js";
import { useDispatch, useSelector } from "react-redux";
import useToggle from "../../../Hooks/useToggle.jsx";
import Button from "../../../Components/Button.jsx";
const Navbar = () => {
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.User);

  const [istoggle, toggler] = useToggle(false);

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
  const dispatch = useDispatch();
  const handleOnClickLogout = () => {
    clearTokenLocalStoragePublic();
    window.location.reload();
  };
  useEffect(() => {
    dispatch(PUBLIC_PROFILE_SAGA());
  }, [dispatch]);
  return (
    <>
      <header className="relative dark:bg-daintree-500 text-daintree-950 bg-mariner-100 dark:text-daintree-50">
        <div className="top-0 z-10 flex items-center justify-between gap-6 py-2 mx-auto lg:container md:pr-4 lg:px-9 lg:sticky lg:justify-start">
          <div className="flex items-center">
            <Button
              onClick={toggler}
              className="z-20 block pl-2 bg-transparent lg:hidden"
            >
              <IoMenu className="text-3xl text-personal-910" />
            </Button>
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
              alt="logo"
              onClick={() => navigate("/")}
              className="z-10 cursor-pointer -ml-9 lg:m-auto"
            />
          </div>

          <div className="items-center flex-1 hidden lg:flex">
            <div className="absolute px-2">
              <LuSearch />
            </div>
            <input
              className="w-full px-1 py-1.5 pl-8 rounded-md focus:outline-none"
              type="search"
              placeholder="type a search"
            />
          </div>
          <nav className="">
            <ul className="flex items-center gap-5 text-1xl">
              {!getTokenLocalStoragePublic() && (
                <li
                // className="tooltip hover:tooltip-open tooltip-bottom"
                // data-tip="Login"
                >
                  <NavLink
                    to="/login"
                    className={`flex hover:text-personal-10 hover:bg-personal-900  rounded items-center   `}
                  >
                    <div className="px-1 py-1.5 rounded dropdown dropdown-end dropdown-hover">
                      <div
                        tabIndex={0}
                        role="button"
                        className="relative flex items-center mx-1 text-lg peer-hover:-rotate-90 hover:text-personal-10"
                      >
                        <div className="pr-2">
                          <LuUser2 />
                        </div>
                        Login
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content dark:bg-gray-900 dark:text-white bg-mariner-100 text-black z-[1] menu p-2 w-52 "
                      >
                        <li className="">
                          <Link
                            to={"/login"}
                            className="hover:bg-personal-50 dark:hover:bg-personal-400 hover:transition-colors"
                          >
                            SignIn
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/signup"}
                            className="hover:bg-personal-50 dark:hover:bg-personal-400 hover:transition-colors"
                          >
                            Signup
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </NavLink>
                </li>
              )}

              <li
                className="tooltip hover:tooltip-open tooltip-bottom"
                data-tip="Cart"
              >
                <NavLink
                  to="/cart"
                  className={`flex  items-center gap-2 text-lg `}
                >
                  <div className="text-2xl md:text-xl">
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
                    <div className="">
                      <AiOutlineShop />
                    </div>
                    <div className="hidden md:block ">Become a Seller</div>
                  </NavLink>
                </li>
              </div>

              <div className="hidden lg:block dropdown dropdown-hover dropdown-end">
                <li>
                  <div tabIndex={0} role="button" className="">
                    <HiOutlineDotsVertical />
                  </div>
                </li>
                <div className="dropdown-content dark:bg-gray-900  bg-mariner-100  z-[1] menu p-2  w-56 mt-4">
                  <div className="flex items-center gap-2 px-2 py-2 border-b border-gray-400 ">
                    <div className="flex items-center gap-3 overflow-hidden avatar">
                      <div className="rounded-full">
                        <div className="flex items-center justify-center w-8 h-8 bg-black">
                          {/* <span className="text-xl text-personal-10">G</span> */}
                          <img
                            src="https://rukminim2.flixcart.com/image/312/312/xif0q/dslr-camera/i/o/c/eos-r100-24-1-eos-r100-kit-canon-original-imagqeydhsxgacxp.jpeg?q=70"
                            className="bg-center "
                            alt="img"
                            width="100%"
                          />
                        </div>
                      </div>
                    </div>
                    {/* sidebar text or list */}
                    <div>
                      <h1 className="font-semibold text-[100%]">
                        {profile?.user?.fullname
                          ? profile?.user?.fullname && profile?.user?.fullname
                          : "Hello User"}
                      </h1>
                    </div>
                  </div>
                  <ul tabIndex={0} className="">
                    {navList.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className=" even:divide-y divide-personal-900/20"
                        >
                          <NavLink className="" to={item.to}>
                            <span className="font-semibold">{item.icon}</span>
                            {item.link}
                          </NavLink>
                        </li>
                      );
                    })}

                    {getTokenLocalStoragePublic() && (
                      <li className=" even:divide-y divide-personal-900/20">
                        <Button
                          onClick={handleOnClickLogout}
                          className="flex justify-center px-2 py-2 text-white bg-red-500"
                        >
                          <span className="font-semibold">
                            <IoLogOutOutline />
                          </span>
                          Logout
                        </Button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {istoggle && (
                <>
                  <div
                    onClick={toggler}
                    className="fixed top-0 left-0 z-10 w-full h-screen bg-personal-910/60"
                  ></div>
                  <div
                    className={`fixed  top-0 left-0  h-screen bg-mariner-100    dark:bg-gray-900
             border-r-2 ease-in duration-1000  delay-1000 rounded-r-xl shadow-2xl border-personal-900/40 z-20 ${
               istoggle ? "w-80  transition" : "w-0"
             }`}
                  >
                    <div
                      onClick={toggler}
                      className="absolute top-0 h-screen px-1 py-2 right-1"
                    >
                      <IoClose className="text-2xl " />
                    </div>
                    <div className="flex items-center gap-2 mx-2 my-4 ">
                      <div className="flex items-center gap-3 overflow-hidden avatar">
                        <div className="rounded-full">
                          <div className="flex items-center justify-center w-12 h-12 bg-black">
                            {/* <span className="text-xl text-personal-10">G</span> */}
                            <img
                              src="https://rukminim2.flixcart.com/image/312/312/xif0q/dslr-camera/i/o/c/eos-r100-24-1-eos-r100-kit-canon-original-imagqeydhsxgacxp.jpeg?q=70"
                              className="bg-center "
                              alt="img"
                              width="100%"
                            />
                          </div>
                        </div>
                      </div>
                      {/* sidebar text or list */}
                      <div>
                        <h1 className="text-xl font-semibold">
                          {profile?.user?.fullname && profile?.user?.fullname}
                        </h1>
                      </div>
                    </div>
                    {/* list */}
                    <nav className="flex flex-col gap-4 ml-3 text-lg capitalize">
                      {navList.map((item, index) => {
                        return (
                          <ul
                            key={index}
                            className="flex items-center dark:divide-blue-100 even:divide-y divide-personal-900/20"
                          >
                            <span className="font-semibold">{item.icon}</span>
                            <NavLink className="pl-3" to={item.to}>
                              {item.link}
                            </NavLink>
                          </ul>
                        );
                      })}
                    </nav>
                    <div className="absolute w-full mx-2 bottom-2 ">
                      <Button className="w-11/12 py-2 text-white bg-red-500 rounded-lg ">
                        Logout
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </ul>
          </nav>
        </div>
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
