import HorizontalCarousel from "../PublicComponents/HorizontalCarousel";
import { IoIosArrowForward } from "react-icons/io";
import Card from "../PublicComponents/Card";
import { useNavigate } from "react-router-dom";

const PublicHomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="">
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
