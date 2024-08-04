import HorizontalCarousel from "../Components/HorizontalCarousel";
import { IoIosArrowForward } from "react-icons/io";
import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productActionRequest } from "../../../Stores/Saga/Actions/ProductsAction";
// import Dropdown from "../../Seller/SellerComponents/Dropdown";
import { FcApproval } from "react-icons/fc";
const PublicHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.products?.category);

  useEffect(() => {
    dispatch({ type: productActionRequest.CATEGORY_REQUEST_SAGA });
  }, [dispatch]);
  const handlenClick = (c) => {
    navigate(`/${c.category}`);
  };
  return (
    <div className="">
      <div className="my-8">
        <div className="relative flex w-full gap-5 justify-evenly ">
          {data?.isloading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-24 h-6 skeleton"></div>
              ))
            : data?.data.map((c, k) => {
                return (
                  <div key={k}>
                    <div
                      onClick={() => handlenClick(c)}
                      className="relative z-50 flex flex-col items-center justify-center capitalize cursor-pointer"
                    >
                      <FcApproval className="text-5xl" />
                      {c.category}
                      {/* <Dropdown trigger={c.category}>
                        {c?.subcategories &&
                          c?.subcategories?.map((sub, i) => {
                            return <div key={i}>{sub}</div>;
                          })}
                      </Dropdown> */}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>

      <div className="py-3">
        <HorizontalCarousel />
      </div>

      <div className="p-3 m-4 border-2 ">
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
      <div className="p-3 m-4 border-2 ">
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

export default PublicHomePage;
