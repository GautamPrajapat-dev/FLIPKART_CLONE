import { LuHeart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container w-4/5 mx-auto divide-y-2">
        {Array.from({ length: 5 }).map((i, l) => {
          return (
            <div
              key={l}
              className="grid grid-cols-1 gap-5 py-2 lg:gap-2 md:grid-cols-4 "
            >
              <div className="relative flex items-center justify-center ">
                <img
                  className="w-64 lg:w-56"
                  src="https://rukminim2.flixcart.com/image/312/312/xif0q/dslr-camera/i/o/c/eos-r100-24-1-eos-r100-kit-canon-original-imagqeydhsxgacxp.jpeg?q=70"
                  alt="image"
                />
                <div className="absolute cursor-pointer top-2 lg:top-4 right-2 lg:right-7">
                  <LuHeart />
                </div>
              </div>
              <div
                onClick={() => navigate("SingleProduct")}
                className="col-span-2 cursor-pointer peer"
              >
                <div className="text-xl font-semibold peer-hover:bg-personal-200">
                  Canon R100 Mirrorless Camera RF-S 18-45mm f/4.5-6.3 IS STM
                  (Black)
                </div>
                <div>
                  <span className="px-3 py-1 text-xs text-white bg-green-700 rounded-lg">
                    4.4
                  </span>
                  174 Ratings & 18 Reviews
                </div>

                <div>
                  <ul className="list-disc list-inside lg:w-4/6 text-md">
                    <li className="list-item">
                      DIGIC 8 Image Processor, 4K 24p Video with Crop, Full HD
                      60p, Dual Pixel CMOS AF with 143 AF Zones, 6.5 fps
                      Electronic Shutter, 2.36m-Dot OLED EVF, 3" 1.04m-Dot LCD
                      Screen, Creative Assist Mode, Silent Mode for Quiet
                      Operation, Bluetooth with SD Card Slot
                    </li>
                    <li className="list-item">Type: CMOS WiFi</li>
                    <li className="list-item">
                      Effective Pixels: 24.1 MP Sensor{" "}
                    </li>
                    <li className="list-item"> Available 4K</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col col-span-1">
                {/* <span>Special price</span> */}
                <span className="text-2xl font-semibold"> ₹47,990 </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm line-through text-gray-400/70">
                    ₹64,995
                  </span>
                  <span className="text-sm text-green-500">26% off</span>
                </div>
                <span className="text-sm">Free delivery</span>
                <span className="text-sm">No Cost Emi</span>
                <span className="text-sm font-bold text-green-600">
                  Bank Offer
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
