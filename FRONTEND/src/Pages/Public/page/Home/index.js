import React from "react";
import HorizontalCarousel from "../../PublicComponents/Carusel/HorizontalCarousel";
import { IoIosArrowForward } from "react-icons/io";
import Card from "../../PublicComponents/Card";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
              img="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
              name={"electronic"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
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
              img="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
        </div>
        <div className="gap-4 carousel carousel-center ">
          <div className="carousel-item">
            <Card
              onClick={() => navigate("/products")}
              img="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
              name={"electronic"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
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
              img="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
          <div className="carousel-item">
            <Card
              img="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
              name={"pizza"}
              price={"3493/-"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
