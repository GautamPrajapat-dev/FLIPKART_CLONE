import { Suspense, lazy } from "react";
import { PageRouts } from "./Utils/PageRoutes.jsx";
import { Route, Routes } from "react-router-dom";
import PublicLayout from "./Pages/Public/page/PublicLayout.jsx";
import SignUp from "./Pages/Public/page/Authentication/SignUp.jsx";
import Login from "./Pages/Public/page/Authentication/Login.jsx";
import AdminLayout from "./Pages/Seller/Layout.jsx";
import PublicHomePage from "./Pages/Public/page/PublicHomePage.jsx";
import AllProducts from "./Pages/Public/page/AllProducts.jsx";
import SingleProduct from "./Pages/Public/page/SingleProduct.jsx";
import Cart from "./Pages/Public/page/Cart.jsx";
import SellOnlineMainPage from "./Pages/Seller/Pages/SellOnline.jsx";
import Signup from "./Pages/Seller/Pages/Authantication/Signup.jsx";
import LoginSeller from "./Pages/Seller/Pages/Authantication/LoginSeller.jsx";
import DashBordLayout from "./Pages/Seller/Pages/Layout.jsx";
import DashbordMainPage from "./Pages/Seller/Pages/DashbordMainPage.jsx";
import NotFound from "./Components/NotFound.jsx";
import OfflineStatus from "./Components/Offline-Status.jsx";
import UpdateUserDetails from "./Pages/Seller/Pages/UpdateUserDetails.jsx";
import ForgetPass from "./Pages/Seller/Pages/Authantication/ForgetPass.jsx";
import ResetPassword from "./Pages/Seller/Pages/Authantication/ResetPassword.jsx";
import GetDataCategory from "./Pages/Public/page/GetDataCategory.jsx";
import ProductSubCategory from "./Pages/Public/page/ProductSubCategory.jsx";

// import whitelist from "./Pages/Public/page/whitelist.jsx";
// const SellOnlineMainPage = lazy(() =>
//   import("./Pages/Seller/Pages/SellOnline")
// );

const Whitelist = lazy(() => import("./Pages/Public/page/Whitelist.jsx"));
const SellerInbox = lazy(() => import("./Pages/Seller/Pages/SellerInbox.jsx"));
const SellerAddProducts = lazy(() =>
  import("./Pages/Seller/Pages/SellerAddProducts.jsx")
);
const SellerProducts = lazy(() =>
  import("./Pages/Seller/Pages/SellerProducts.jsx")
);
const SellerProfile = lazy(() =>
  import("./Pages/Seller/Pages/SellerProfile.jsx")
);

const ProductDetails = lazy(() =>
  import("./Pages/Seller/Pages/ProductDetails.jsx")
);

const App = () => {
  return (
    <>
      {!window.navigator.onLine ? (
        <OfflineStatus />
      ) : (
        <Suspense
          fallback={
            <div className="absolute z-50 flex items-center justify-center w-full h-screen dark:bg-gray-900 bg-gray-50 bg-opacity-40 ">
              <div className="w-12 loading">
                <div className="bg-purple-500 loading-spinner"></div>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path={PageRouts.MAIN_ROUTE} element={<PublicLayout />}>
              <Route index element={<PublicHomePage />} />
              <Route path={PageRouts.LOGIN_ROUTE} element={<Login />} />
              <Route path={PageRouts.SIGNUP_ROUTE} element={<SignUp />} />
              <Route
                path={PageRouts.GETDATA_CATEGORY_ROUTE}
                element={<GetDataCategory />}
              />
              <Route
                path={PageRouts.GETDATA_SUB_CATEGORY_ROUTE}
                element={<ProductSubCategory />}
              />
              <Route
                path={PageRouts.GET_DATA_SINGLE_PORDUCT_ROUTE}
                element={<SingleProduct />}
              />

              <Route
                path={PageRouts.ALL_PRODUCTS_ROUTE}
                element={<AllProducts />}
              ></Route>
              <Route path={PageRouts.CART_ROUTE} element={<Cart />} />
              <Route
                path={PageRouts.SINGLE_PRODUCT_ROUTE}
                element={<SingleProduct />}
              />
              <Route path={PageRouts.PublicWhiteList} element={<Whitelist />} />
            </Route>
            <Route path={PageRouts.SELLER_ROUTE} element={<AdminLayout />}>
              <Route index element={<SellOnlineMainPage />} />
              <Route
                path={PageRouts.SELLER_SIGNUP_ROUTE}
                element={<Signup />}
              />
              <Route
                path={PageRouts.SELLER_RESET_PASS_PAGE_ROUTE}
                element={<ResetPassword />}
              />
              <Route
                path={PageRouts.SELLER_FORGET_PASS_PAGE_ROUTE}
                element={<ForgetPass />}
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
                path={PageRouts.SELER_UPDATE_PERSONAL_DETAILS}
                element={<UpdateUserDetails />}
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
