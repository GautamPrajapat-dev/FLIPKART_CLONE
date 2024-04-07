import React from "react";
import Main from "./Pages/Public/Main";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Public/page/SignUp/SignUp";
import Login from "./Pages/Public/page/Login/Login";
import AdminLayout from "./Pages/Seller/Layout";
import Home from "./Pages/Public/page/Home";
import Products from "./Pages/Public/page/Products";
import SingleProduct from "./Pages/Public/page/SingleProduct";
import Cart from "./Pages/Public/page/Cart";
import SellOnlineMainPage from "./Pages/Seller/Pages/SellOnline";
import Signup from "./Pages/Seller/Pages/Authantication/Signup.js";
import LoginSeller from "./Pages/Seller/Pages/Authantication/LoginSeller.js";
import DashBordLayout from "./Pages/Seller/Pages/Dashboard/Layout.js";
import DashbordMainPage from "./Pages/Seller/Pages/Dashboard/DashbordMainPage.js";
import SellerInbox from "./Pages/Seller/Pages/Dashboard/SellerInbox";
import SellerAddProducts from "./Pages/Seller/Pages/Dashboard/SellerAddProducts.js";
import SellerProducts from "./Pages/Seller/Pages/Dashboard/SellerProducts.js";
import SellerProfile from "./Pages/Seller/Pages/Dashboard/Profile/SellerProfile.js";
import NotFound from "./Components/404/index.js";
import ProductDetails from "./Pages/Seller/Pages/Dashboard/ProductDetails/ProductDetails.js";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="products/:products" element={<Products />}></Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products/:SingleProduct" element={<SingleProduct />} />
        </Route>
        <Route path="/seller" element={<AdminLayout />}>
          <Route index element={<SellOnlineMainPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<LoginSeller />} />
        </Route>
        <Route path="/dashboard" element={<DashBordLayout />}>
          <Route index path="/dashboard/main" element={<DashbordMainPage />} />
          <Route path="/dashboard/inbox" element={<SellerInbox />} />
          <Route path="/dashboard/products" element={<SellerProducts />} />
          <Route path="/dashboard/products/:id" element={<ProductDetails />} />
          <Route
            path="/dashboard/addnewproducts"
            element={<SellerAddProducts />}
          />
          <Route path="/dashboard/profile" element={<SellerProfile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
