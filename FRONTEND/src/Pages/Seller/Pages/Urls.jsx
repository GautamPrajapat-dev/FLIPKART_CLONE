import { lazy } from "react";
// import DashboardNavbar from "../SellerComponents/DashboardNavbar";
const DashboardNavbar = lazy(() =>
  import("../SellerComponents/DashboardNavbar")
);
import AdminLayout from "./Layout";
import SellOnlineMainPage from "./SellOnline";
import ResetPassword from "./Authantication/ResetPassword";
import ForgetPass from "./Authantication/ForgetPass";
import LoginSeller from "./Authantication/LoginSeller";
import Signup from "./Authantication/Signup";
import DashbordMainPage from "./DashbordMainPage";
import DashBordLayout from "./Layout";
import UpdateUserDetails from "./UpdateUserDetails";
import SellerProducts from "./SellerProducts";
import ProductDetails from "./ProductDetails";
import SellerProfile from "./SellerProfile";
import SellerInbox from "./SellerInbox";
import SellerAddProducts from "./SellerAddProducts";
export {
  UpdateUserDetails,
  ProductDetails,
  SellerProducts,
  SellerProfile,
  DashBordLayout,
  DashbordMainPage,
  SellOnlineMainPage,
  ResetPassword,
  SellerAddProducts,
  Signup,
  ForgetPass,
  LoginSeller,
  DashboardNavbar,
  SellerInbox,
  AdminLayout,
};
