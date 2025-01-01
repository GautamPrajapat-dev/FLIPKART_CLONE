import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet, useNavigation, useRouteError } from "react-router-dom";
import Loading from "../../../Components/Loading";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

const PublicLayout = () => {
  const err = useRouteError();
  console.log(err);
  // const navigation = useNavigation();
  // console.log(navigation.state);
  // if (navigation.state === "loading") return <Loading />;
  return (
    <>
      <Suspense fallback={<Loading />}>
        <main className="relative h-screen overflow-y-scroll no-scroll">
          <Navbar />
          <div className="container mx-auto">
            <ToastContainer stacked />
            <Outlet />
          </div>
          <Footer />
        </main>
      </Suspense>
    </>
  );
};

export default PublicLayout;
