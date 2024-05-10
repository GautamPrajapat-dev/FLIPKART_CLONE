import React from "react";
import HorizontalCarousel from "../PublicComponents/Carusel/HorizontalCarousel";
import { IoIosArrowForward } from "react-icons/io";
import Card from "../PublicComponents/Card";
import { useNavigate } from "react-router-dom";

const PublicHomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
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
          <div className="carousel-item">
            <Card
              onClick={() => navigate("/products")}
              img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
              name={"electronic"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
        </div>
        <div className="gap-4 carousel carousel-center ">
          <div className="carousel-item">
            <Card
              onClick={() => navigate("/products")}
              img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
              name={"electronic"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/d/3/g/-original-imagy2v5ggthbvfe.jpeg?q=70"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicHomePage;
