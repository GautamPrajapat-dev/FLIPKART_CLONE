import HorizontalCarousel from "../Components/HorizontalCarousel";
import { IoIosArrowForward } from "react-icons/io";
import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useTransition } from "react";
import { CategoryRequestSaga } from "../../../Stores/Actions/ProductsAction";
// import Dropdown from "../../Seller/SellerComponents/Dropdown";
// import { FcApproval } from "react-icons/fc";
const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const data = useSelector((state) => state?.products?.category);

  const handleOnClick = (c) => {
    navigate(`/category?category=${c.category}`);
  };
  useEffect(() => {
    startTransition(() => {
      dispatch(CategoryRequestSaga());
    });
  }, [dispatch]);
  return (
    <div className="">
      <div className="py-2 bg-white border-b shadow ">
        <div className="relative flex items-center w-full gap-5 justify-evenly ">
          {isPending
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-24 h-6 skeleton"></div>
              ))
            : data?.data.map((c, k) => {
                return (
                  <div key={k} className="relative">
                    <div
                      onClick={() => handleOnClick(c)}
                      className="relative z-50 flex flex-col items-center justify-center text-black capitalize cursor-pointer "
                    >
                      {/* <FcApproval className="text-5xl" /> */}
                      {c.category}
                    </div>
                    {/* <Dropdown trigger={c.category}>
                      {c?.subcategories &&
                        c?.subcategories?.map((sub, i) => {
                          return <div key={i}>{sub}</div>;
                        })}
                    </Dropdown> */}
                  </div>
                );
              })}
        </div>
      </div>

      <div className="pb-3 mt-2">
        <HorizontalCarousel />
      </div>

      <div className="p-3 my-4 bg-white border-2">
        <div className="flex justify-between py-2 mb-4 text-xl font-bold">
          <div>Best Of Electronics</div>
          <div className="flex items-center px-1 rounded-full bg-personal-900 text-personal-10">
            <IoIosArrowForward />
          </div>
        </div>
        <div className="gap-4 carousel carousel-center ">
          {Array.from({ length: 12 }).map((_, i) => {
            return (
              <div key={i} className="carousel-item">
                <Card
                  onClick={() => navigate("/products")}
                  img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
                  name={"electronic"}
                  price={"3493/-"}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-3 my-4 bg-white border-2">
        <div className="flex justify-between py-2 mb-4 text-xl font-bold">
          <div>Best Of Furniture</div>
          <div className="flex items-center px-1 rounded-full bg-personal-900 text-personal-10">
            <IoIosArrowForward />
          </div>
        </div>
        <div className="gap-4 carousel carousel-center ">
          {Array.from({ length: 12 }).map((_, i) => {
            return (
              <div key={i} className="carousel-item">
                <Card
                  onClick={() => navigate("/products")}
                  img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
                  name={"electronic"}
                  price={"3493/-"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
