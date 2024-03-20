import React from "react";
import { Outlet } from "react-router-dom";
import NavbarSeller from "./SellerComponents/NavbarSeller";
import Footer from "./SellerComponents/Footer";

// import NavbarSeller from "./SellerComponents/Navbar";
// import Footer from "./SellerComponents/Footer";

const AdminLayout = () => {
  // const { isAuthantiCate } = useSelector((state) => state.Seller);
  // const token = !!localStorage?.getItem("_token");

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (token !== null) {
  //     navigate("/seller/dasboard/main");
  //   }
  //   return () => {
  //     navigate("/seller");
  //   };
  // }, [token, navigate]);
  return (
    <div>
      <NavbarSeller />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminLayout;
