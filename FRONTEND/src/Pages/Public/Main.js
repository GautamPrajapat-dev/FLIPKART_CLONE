import React from "react";
import Navbar from "./PublicComponents/Navbar/Navbar";
import Footer from "./PublicComponents/Footer/Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <main className="h-screen overflow-y-scroll no-scroll">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Main;
