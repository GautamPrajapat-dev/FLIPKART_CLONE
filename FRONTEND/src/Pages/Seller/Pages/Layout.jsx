import { Outlet } from "react-router-dom";
import NavbarSeller from "../SellerComponents/NavbarSeller";
import Footer from "../SellerComponents/Footer";

// import NavbarSeller from "./SellerComponents/Navbar";
// import Footer from "./SellerComponents/Footer";

const AdminLayout = () => {
  return (
    <div>
      {/* <NavbarSeller /> */}
      <Outlet />
    </div>
  );
};

export default AdminLayout;
