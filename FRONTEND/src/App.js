import React, { Suspense, lazy } from "react";
import PublicLayout from "./Pages/Public/page/PublicLayout.js";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Public/page/Authentication/SignUp";
import Login from "./Pages/Public/page/Authentication/Login";
import AdminLayout from "./Pages/Seller/Layout";
import PublicHomePage from "./Pages/Public/page/PublicHomePage.js";
import AllProducts from "./Pages/Public/page/AllProducts.js";
import SingleProduct from "./Pages/Public/page/SingleProduct.js";
import Cart from "./Pages/Public/page/Cart.js";
import SellOnlineMainPage from "./Pages/Seller/Pages/SellOnline";
import Signup from "./Pages/Seller/Pages/Authantication/Signup.js";
import LoginSeller from "./Pages/Seller/Pages/Authantication/LoginSeller.js";
import DashBordLayout from "./Pages/Seller/Pages/Dashboard/Layout.js";
import DashbordMainPage from "./Pages/Seller/Pages/Dashboard/DashbordMainPage.js";
import NotFound from "./Components/404/index.js";
import { PageRouts } from "./Constant/PageRoutes.js";
// const SellOnlineMainPage = lazy(() =>
//   import("./Pages/Seller/Pages/SellOnline")
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
  import("./Pages/Seller/Pages/Dashboard/SellerProfile.js")
);

const ProductDetails = lazy(() =>
  import("./Pages/Seller/Pages/Dashboard/ProductDetails.js")
);

const App = () => {
  return (
    <>
      {!window.navigator.onLine ? (
        <>
          <div className="flex justify-center items-center w-full h-screen">
            <div className="flex  items-center gap-3 flex-col">
              <img src="/image/emptyList.png" alt="" width={250} />
              <span className="font-extrabold text-3xl">
                You're Offine Please Go Back Oline
              </span>
            </div>
          </div>
        </>
      ) : (
        <Suspense
          fallback={
            <div className="absolute z-50 flex items-center justify-center w-full h-screen bg-white bg-opacity-40 ">
              <div className="loading w-12">
                <div className=" bg-purple-500  loading-spinner"></div>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path={PageRouts.MAIN_ROUTE} element={<PublicLayout />}>
              <Route index element={<PublicHomePage />} />
              <Route path={PageRouts.LOGIN_ROUTE} element={<Login />} />
              <Route path={PageRouts.CART_ROUTE} element={<Cart />} />
              <Route
                path={PageRouts.ALL_PRODUCTS_ROUTE}
                element={<AllProducts />}
              ></Route>
              <Route path={PageRouts.SIGNUP_ROUTE} element={<SignUp />} />
              <Route
                path={PageRouts.SINGLE_PRODUCT_ROUTE}
                element={<SingleProduct />}
              />
            </Route>
            <Route path={PageRouts.SELLER_ROUTE} element={<AdminLayout />}>
              <Route index element={<SellOnlineMainPage />} />
              <Route
                path={PageRouts.SELLER_SIGNUP_ROUTE}
                element={<Signup />}
              />
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
      )}
    </>
  );
};

export default App;
