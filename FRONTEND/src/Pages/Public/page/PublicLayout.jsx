import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet, useNavigation } from "react-router-dom";
import Loading from "../../../Components/Loading";

const PublicLayout = () => {
  const navigation = useNavigation();
  console.log(navigation.state);
  if (navigation.state === "loading") return <Loading />;
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
