import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./Pages/Public/page/Layout";
import HomePage from "./Pages/Public/page/HomePage";
import Login from "./Pages/Public/page/Authentication/Login";
import SignUp from "./Pages/Public/page/Authentication/SignUp";
import CategoryProductList from "./Pages/Public/page/CategoryProductList";
import ProductList from "./Pages/Public/page/Products_List";
import SingleProduct from "./Pages/Public/page/SingleProduct";
import Cart from "./Pages/Public/page/Cart";
import Whitelist from "./Pages/Public/page/Whitelist";
import NotFound from "./Components/NotFound";
// import AdminLayout from "./Pages/Seller/Pages/Layout";
// import SellOnlineMainPage from "./Pages/Seller/Pages/SellOnline";
// import ResetPassword from "./Pages/Seller/Pages/Authantication/ResetPassword";
// import { Signup } from "./Stores/Saga/Services/Seller.Product.Services";
// import ForgetPass from "./Pages/Seller/Pages/Authantication/ForgetPass";
// import LoginSeller from "./Pages/Seller/Pages/Authantication/LoginSeller";
// import DashBordLayout from "./Pages/Seller/Pages/Layout";
// import DashbordMainPage from "./Pages/Seller/Pages/DashbordMainPage";
// import SellerInbox from "./Pages/Seller/Pages/SellerInbox";
// import UpdateUserDetails from "./Pages/Seller/Pages/UpdateUserDetails";
// import SellerProducts from "./Pages/Seller/Pages/SellerProducts";
// import ProductDetails from "./Pages/Seller/Pages/ProductDetails";
// import SellerAddProducts from "./Pages/Seller/Pages/SellerAddProducts";
// import SellerProfile from "./Pages/Seller/Pages/SellerProfile";
// import { useDispatch, useSelector } from "react-redux";
// import { productActionSuccess } from "./Stores/Saga/Actions/ProductsAction";
import {
  UpdateUserDetails,
  ProductDetails,
  SellerProducts,
  SellerProfile,
  DashBordLayout,
  DashbordMainPage,
  SellOnlineMainPage,
  ResetPassword,
  Signup,
  ForgetPass,
  SellerInbox,
  SellerAddProducts,
  LoginSeller,
  AdminLayout,
} from "./Pages/Seller/Pages/Urls";

const App = () => {
  const Routes = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "/login",
          element: <Login />,
        },
        { path: "/signup", element: <SignUp /> },
        {
          path: "/category",
          element: <CategoryProductList />,
        },
        {
          path: "/products",
          element: <ProductList />,
        },
        {
          path: "/s",
          element: <SingleProduct />,
        },
        // { path: "/products/:SingleProduct", element: <SingleProduct /> },
        { path: "/cart", element: <Cart /> },
        { path: "/whitelist", element: <Whitelist /> },
      ],
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
  return <RouterProvider router={Routes} />;
};

export default App;
