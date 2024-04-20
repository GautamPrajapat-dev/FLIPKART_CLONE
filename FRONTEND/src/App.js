import React, { Suspense, lazy } from "react";
import Main from "./Pages/Public/Main";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Public/page/Authentication/SignUp";
import Login from "./Pages/Public/page/Authentication/Login";
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
// import SellerInbox from "./Pages/Seller/Pages/Dashboard/SellerInbox";
// import SellerAddProducts from "./Pages/Seller/Pages/Dashboard/SellerAddProducts.js";
// import SellerProducts from "./Pages/Seller/Pages/Dashboard/SellerProducts.js";
// import SellerProfile from "./Pages/Seller/Pages/Dashboard/Profile/SellerProfile.js";
import NotFound from "./Components/404/index.js";
import { PageRouts } from "./Constant/PageRoutes.js";
// import ProductDetails from "./Pages/Seller/Pages/Dashboard/ProductDetails/ProductDetails.js";
// const DashbordMainPage = lazy(() =>
//   import("./Pages/Seller/Pages/Dashboard/DashbordMainPage.js")
// );
const SellerInbox = lazy(() =>
  import("./Pages/Seller/Pages/Dashboard/SellerInbox")
);
const SellerAddProducts = lazy(() =>
  import("./Pages/Seller/Pages/Dashboard/SellerAddProducts.js")
);
const SellerProducts = lazy(() =>
  import("./Pages/Seller/Pages/Dashboard/SellerProducts.js")
);
const SellerProfile = lazy(() =>
  import("./Pages/Seller/Pages/Dashboard/Profile/SellerProfile.js")
);

const ProductDetails = lazy(() =>
  import("./Pages/Seller/Pages/Dashboard/ProductDetails/ProductDetails.js")
);
const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="absolute z-50 flex items-center justify-center w-full h-screen bg-white bg-opacity-40 ">
            <div>
              <div className="w-12 bg-purple-500 loading loading-spinner"></div>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path={PageRouts.MAIN_ROUTE} element={<Main />}>
            <Route index element={<Home />} />
            <Route path={PageRouts.LOGIN_ROUTE} element={<Login />} />
            <Route path={PageRouts.CART_ROUTE} element={<Cart />} />
            <Route
              path={PageRouts.ALL_PRODUCTS_ROUTE}
              element={<Products />}
            ></Route>
            <Route path={PageRouts.SIGNUP_ROUTE} element={<SignUp />} />
            <Route
              path={PageRouts.SINGLE_PRODUCT_ROUTE}
              element={<SingleProduct />}
            />
          </Route>
          <Route path={PageRouts.SELLER_ROUTE} element={<AdminLayout />}>
            <Route index element={<SellOnlineMainPage />} />
            <Route path={PageRouts.SELLER_SIGNUP_ROUTE} element={<Signup />} />
            <Route
              path={PageRouts.SELLER_SIGNIN_ROUTE}
              element={<LoginSeller />}
            />
          </Route>
          <Route
            path={PageRouts.SELLER_DASHBOARD_ROUTE}
            element={<DashBordLayout />}
          >
            <Route
              index
              path={PageRouts.SELLER_MAIN_DASHBOARD_ROUTE}
              element={<DashbordMainPage />}
            />
            <Route
              path={PageRouts.SELLER_DASHBOARD_INBOX}
              element={<SellerInbox />}
            />
            <Route
              path={PageRouts.SELLER_DASHBOARD_PRODUCT}
              element={<SellerProducts />}
            />
            <Route
              path={PageRouts.SELLER_DASHBOARD_SINGLEPRODUCT}
              element={<ProductDetails />}
            />
            <Route
              path={PageRouts.SELLER_DASHBOARD_ADD_NEW_PRODUCTS}
              element={<SellerAddProducts />}
            />
            <Route
              path={PageRouts.SELLER_DASHBOARD_PROFILE}
              element={<SellerProfile />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
