import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { PageRouts } from "../src/Utils/PageRoutes";
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
import { Signup } from "../src/Stores/Saga/Services/Seller.Product.Services";
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

const Routes = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <PublicHomePage /> },
      {
        path: PageRouts.LOGIN_ROUTE,
        element: <Login />,
      },
      { path: PageRouts.SIGNUP_ROUTE, element: <SignUp /> },
      {
        path: PageRouts.GETDATA_CATEGORY_ROUTE,
        element: <GetDataCategory />,
      },
      {
        path: PageRouts.GETDATA_SUB_CATEGORY_ROUTE,
        element: <ProductSubCategory />,
      },
      {
        path: PageRouts.GET_DATA_SINGLE_PORDUCT_ROUTE,
        element: <SingleProduct />,
      },
      {
        path: PageRouts.ALL_PRODUCTS_ROUTE,
        element: <AllProducts />,
      },
    ],

    errorElement: <NotFound />,
  },

  createRoutesFromElements(
    <Route>
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
        <Route path={PageRouts.SELLER_SIGNUP_ROUTE} element={<Signup />} />
        <Route
          path={PageRouts.SELLER_RESET_PASS_PAGE_ROUTE}
          element={<ResetPassword />}
        />
        <Route
          path={PageRouts.SELLER_FORGET_PASS_PAGE_ROUTE}
          element={<ForgetPass />}
        />

        <Route path={PageRouts.SELLER_SIGNIN_ROUTE} element={<LoginSeller />} />
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
    </Route>
  ),
]);
console.log(Routes.routes);

export default Routes;
