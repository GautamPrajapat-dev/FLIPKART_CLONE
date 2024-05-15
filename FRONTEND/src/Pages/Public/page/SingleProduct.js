import React from "react";
import { LuHeart } from "react-icons/lu";
import Button from "../../../Components/Button";
// import { useNavigate } from "react-router-dom";

const SingleProduct = () => {
  return (
    <div className="container w-4/5 mx-auto my-6 divide-y-2 lg:h-[100vh]">
      <div className="grid grid-cols-1 gap-5 py-2 lg:gap-2 md:grid-cols-3 ">
        <div className="relative flex flex-col items-center justify-center ">
          <img
            className="w-64 lg:w-96"
            src="https://rukminim2.flixcart.com/image/312/312/xif0q/dslr-camera/i/o/c/eos-r100-24-1-eos-r100-kit-canon-original-imagqeydhsxgacxp.jpeg?q=70"
            alt=""
          />
          <div className="absolute cursor-pointer top-2 lg:top-4 right-2 lg:right-7">
            <LuHeart />
          </div>
          <div className="flex w-[90%] gap-2 mt-12 ">
            <Button className="px-6 py-2 bg-orange-500">Add to Cart</Button>
            <Button className="px-6 py-2">buy Now</Button>
          </div>
        </div>
        {/* product details */}
        <div className="flex flex-col col-span-2 gap-4 cursor-pointer peer">
          <div className="text-lg font-semibold text-black/70 peer-hover:bg-personal-200">
            DELL S Series 27 inch Full HD IPS Panel with Brightness : 300 nits,
            Color Gamut, 99% sRGB, 5 Years Warranty, Ultra Slim Bezel Monitor
            (S2721HNM / S2721HN) (AMD Free Sync, Response Time: 4 ms, 75 Hz
            Refresh Rate)
          </div>
          <div>
            <span className="px-3 py-1 text-xs text-white bg-green-700 rounded-lg">
              4.4
            </span>
            174 Ratings & 18 Reviews
          </div>

          <div>
            {/* <ul className="list-disc list-inside lg:w-4/6 text-md">
              <li className="list-item">
                DIGIC 8 Image Processor, 4K 24p Video with Crop, Full HD 60p,
                Dual Pixel CMOS AF with 143 AF Zones, 6.5 fps Electronic
                Shutter, 2.36m-Dot OLED EVF, 3" 1.04m-Dot LCD Screen, Creative
                Assist Mode, Silent Mode for Quiet Operation, Bluetooth with SD
                Card Slot
              </li>
              <li className="list-item">Type: CMOS WiFi</li>
              <li className="list-item">Effective Pixels: 24.1 MP Sensor </li>
              <li className="list-item"> Available 4K</li>
            </ul> */}
            <div className="flex flex-col col-span-1 col-start-2">
              <span className="text-2xl font-semibold"> ₹47,990 </span>
              <div className="flex items-center gap-2">
                <span className="text-sm line-through text-gray-400/70">
                  ₹64,995
                </span>
                <span className="text-sm text-green-500">26% off</span>
              </div>
              <span className="text-sm">Free delivery</span>
              <span className="text-sm">No Cost EMI</span>
              <span className="text-sm font-bold text-green-600">
                Bank Offer
              </span>
            </div>
            {/* other details  */}
            <div className="grid grid-cols-4">
              <div className="col-span-1">description</div>
              <div className="col-span-3">
                You can enjoy high-quality visuals with the help of the Dell
                68.58 cm (27) S2721HN Monitor. Featuring a three-sided thin
                bezel design and a Full HD display with a resolution of up to
                1920x1080p, this monitor renders exceptional clarity. It boasts
                In-Plane Switching technology and a wide viewing angle of
                178°/178° for consistent colours and seamless viewing. Also,
                thanks to AMD FreeSync technology and a refresh rate of 75 Hz,
                this monitor offers a smooth and tear-free viewing experience.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
