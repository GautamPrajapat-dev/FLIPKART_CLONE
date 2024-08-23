import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../src/Pages/Public/page/PublicLayout";
import PublicHomePage from "../src/Pages/Public/page/PublicHomePage";
import Login from "../src/Pages/Public/page/Authentication/Login";
import SignUp from "../src/Pages/Public/page/Authentication/SignUp";
import GetDataCategory from "../src/Pages/Public/page/GetDataCategory";
import ProductSubCategory from "../src/Pages/Public/page/ProductSubCategory";
import SingleProduct from "../src/Pages/Public/page/SingleProduct";
import AllProducts from "../src/Pages/Public/page/AllProducts";
import Cart from "../src/Pages/Public/page/Cart";
import Whitelist from "../src/Pages/Public/page/Whitelist";
import AdminLayout from "../src/Pages/Seller/Layout";
import SellOnlineMainPage from "../src/Pages/Seller/Pages/SellOnline";
import ResetPassword from "../src/Pages/Seller/Pages/Authantication/ResetPassword";
import ForgetPass from "../src/Pages/Seller/Pages/Authantication/ForgetPass";
import LoginSeller from "../src/Pages/Seller/Pages/Authantication/LoginSeller";
import DashBordLayout from "../src/Pages/Seller/Pages/Layout";
import DashbordMainPage from "../src/Pages/Seller/Pages/DashbordMainPage";
import SellerInbox from "../src/Pages/Seller/Pages/SellerInbox";
import UpdateUserDetails from "../src/Pages/Seller/Pages/UpdateUserDetails";
import SellerProducts from "../src/Pages/Seller/Pages/SellerProducts";
import ProductDetails from "../src/Pages/Seller/Pages/ProductDetails";
import SellerAddProducts from "../src/Pages/Seller/Pages/SellerAddProducts";
import SellerProfile from "../src/Pages/Seller/Pages/SellerProfile";
import NotFound from "../src/Components/NotFound";
import Signup from "../src/Pages/Seller/Pages/Authantication/Signup";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <PublicHomePage /> },
      {
        path: "/login",
        element: <Login />,
      },
      { path: "/signup", element: <SignUp /> },
      {
        path: "/:category",
        element: <GetDataCategory />,
      },
      {
        path: "/:category/:subcategory",
        element: <ProductSubCategory />,
      },
      {
        path: "/:category/:subcategory/:id",
        element: <SingleProduct />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      { path: "/products/:SingleProduct", element: <SingleProduct /> },
      { path: "/cart", element: <Cart /> },
      { path: "/whitelist", element: <Whitelist /> },
    ],

    errorElement: <NotFound />,
  },
  {
    path: "/seller",
    element: <AdminLayout />,
    children: [
      { index: true, element: <SellOnlineMainPage /> },

      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "reset_your_password",
        element: <ForgetPass />,
      },
      {
        path: "login",
        element: <LoginSeller />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBordLayout />,
    children: [
      {
        index: true,
        path: "/dashboard/main",
        element: <DashbordMainPage />,
      },
      {
        path: "/dashboard/inbox",
        element: <SellerInbox />,
      },
      {
        path: "/dashboard/update_your_details",
        element: <UpdateUserDetails />,
      },
      {
        path: "/dashboard/products",
        element: <SellerProducts />,
      },
      {
        path: "/dashboard/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/dashboard/addnewproducts",
        element: <SellerAddProducts />,
      },
      {
        path: "/dashboard/profile",
        element: <SellerProfile />,
      },
    ],
  },
]);
console.log(Routes.routes);

export default Routes;
