import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center w-full h-screen bg-personal-20 ">
      <div className="relative">
        <div className="flex flex-col items-center gap-4 ">
          <div className=" text-black text-[12rem]">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="260px"
                height="120px"
              >
                <text
                  kerning="auto"
                  fontFamily="Myriad Pro"
                  fill="rgb(0, 0, 0)"
                  transform="matrix( 1.78243691500789, 0, 0, 1.78243691500789,0.07278366276488, 104.3872675026855)"
                  font-size="80.697px"
                >
                  <tspan
                    fontSize="80.697px"
                    fontFamily="Arial"
                    fontWeight="bold"
                    fill="#000000"
                  >
                    &#52;&#48;&#52;
                  </tspan>
                </text>
              </svg>
            </div>
          </div>
          <div className="text-3xl tracking-wider text-black ">
            <span>Not Found</span>
          </div>

          <div className="">
            <Button
              onClick={() => navigate(-1)}
              className="py-3 text-black btn-outline hover:text-white btn px-9"
              children="Go Back"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
