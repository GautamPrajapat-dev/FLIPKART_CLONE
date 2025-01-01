import { Outlet } from "react-router-dom";
import NavbarSeller from "./Components/NavbarSeller";
import Footer from "./Components/Footer";
import { Suspense } from "react";
import Loading from "../../../Components/Loading";

// import NavbarSeller from "./SellerComponents/Navbar";
// import Footer from "./SellerComponents/Footer";

const AdminLayout = () => {
  return (
    <>
      <NavbarSeller />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default AdminLayout;
