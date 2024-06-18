import React from "react";
import { Carousel } from "react-responsive-carousel";

const HorizontalCarousel = () => {
  return (
    <Carousel
      ariaLabel={false}
      labels={false}
      autoPlay
      renderIndicator={false}
      infiniteLoop={true}
      showStatus={false}
      showThumbs={false}
    >
      <div>
        <img
          src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/aa1b2bdcf519b468.jpg?q=20"
          alt=""
        />
      </div>
      <div>
        <img
          src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d666db78034ac39f.jpg?q=20"
          alt=""
        />
      </div>
      <div>
        <img
          src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/092d41bc9f655fc9.jpeg?q=20"
          alt=""
        />
      </div>
      <div>
        <img
          src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/352e6f0f8034fab5.jpg?q=20"
          alt=""
        />
      </div>
      <div>
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/7fd0e4ab26429926.jpg?q=20"
          alt=""
        />
      </div>
    </Carousel>
  );
};

export default HorizontalCarousel;
