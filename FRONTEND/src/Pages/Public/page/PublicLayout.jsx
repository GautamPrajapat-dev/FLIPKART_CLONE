import Navbar from "../PublicComponents/Navbar";
import Footer from "../PublicComponents/Footer";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      <main className="h-screen overflow-y-scroll no-scroll">
        <Navbar />
        <div className="container mx-auto">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default PublicLayout;
