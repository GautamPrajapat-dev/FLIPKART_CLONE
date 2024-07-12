import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SELLER_PROFILE_SAGA } from "../../../../Stores/Slice/Seller.Auth.Slice";
const SellOnlineMainPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.Seller.profile);
  const navigate = useNavigate();
  useEffect(() => {
    if (profile?.status === true) {
      navigate("/dashboard/main");
    }
    dispatch(SELLER_PROFILE_SAGA());
  }, [profile?.status, navigate, dispatch]);
  return (
    <>
      <div className="mx-auto lg:w-10/12">
        {/* header section */}
        <div className="relative px-8 py-12 md:py-2">
          <img
            className="relative -right-14"
            src="https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/banner/Banner_Desktop_1280x545_1.webp"
            alt="https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/banner/Banner_Desktop_1280x545_1.webp"
            width="90%"
            loading="lazy"
          />
          <div className="absolute w-1/2 md:text-4xl top-14 lg:top-40 md:left-20 ">
            <span className="font-semibold"> Become a Flipkart Seller</span>
            <br /> and sell to 45+Crore customers
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-around w-10/12 mx-auto mb-12 border rounded-lg">
          <div className="flex flex-col items-center justify-center py-4 ">
            <span className="text-2xl font-bold text-personal-300">
              14 Lakh+
            </span>
            <span>Seller community</span>
          </div>
          <div className="flex flex-col items-center justify-center py-4">
            <span className="text-2xl font-bold text-personal-300">24x7</span>
            <span>Online Business</span>
          </div>
          <div className="flex flex-col items-center justify-center py-4">
            <span className="text-2xl font-bold text-personal-300">7</span>
            <span>days* payment</span>
          </div>
          <div className="flex flex-col items-center justify-center py-4 ">
            <span className="text-2xl font-bold text-personal-300">19000+</span>
            <span>Pincodes served</span>
          </div>
        </div>
        {/*  sellers love selling on ️Flipkart? section */}
        <div>
          <div className="grid px-4 lg:px-0 lg:grid-cols-3 gap-9">
            <div className="flex flex-col col-span-2 gap-6">
              <div className="flex flex-col gap-6">
                <div className="text-4xl font-semibold text-personal-300">
                  <span className="text-black">Why do </span>sellers love
                  selling on ️Flipkart?
                </div>
                <div className="w-11/12 text-slate-400">
                  45 crore+ customers across India trust Flipkart.com to be
                  their number 1 online shopping destination. It is no surprise
                  that more than a million sellers trust their products to be
                  made available 24x7 on Flipkart.
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 ">
                <div className="flex flex-col px-2 py-4 rounded-md shadow-md">
                  <div className="text-[20px] items-center flex gap-3 font-semibold">
                    <img
                      src="https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/icons/__Opportunity.svg"
                      alt="icon"
                      width="15%"
                      loading="lazy"
                    />
                    Opportunity
                  </div>
                  <div className="mt-5 text-sm text-slate-400">
                    45 crore+ of customers across 19000+ pincodes, and access to
                    shopping festivals like The Big Billion Days, and more.
                  </div>
                </div>
                <div className="flex flex-col px-2 py-4 rounded-md shadow-md">
                  <div className="text-[20px] items-center flex gap-3 font-semibold">
                    <img
                      src="https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/icons/__Ease.svg"
                      alt="icon"
                      width="15%"
                      loading="lazy"
                    />
                    Ease of Doing Business
                  </div>
                  <div className="mt-5 text-sm text-slate-400">
                    Create your Flipkart seller account in under 10 minutes with
                    just 1 product and a valid GSTIN number.
                  </div>
                </div>
                <div className="flex flex-col px-2 py-4 rounded-md shadow-md">
                  <div className="text-[20px] flex gap-3  items-center font-semibold">
                    <img
                      src="https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/icons/__Growth.svg"
                      alt="icon"
                      width="15%"
                      loading="lazy"
                    />
                    Growth
                  </div>
                  <div className="mt-5 text-sm text-slate-400">
                    Sellers see an average 2.8X spike in growth, 2.3X more
                    visibility, and up to 5X growth in The Big Billion Days
                    Sale.
                  </div>
                </div>
                <div className="flex flex-col px-2 py-4 rounded-md shadow-md">
                  <div className="text-[20px] flex gap-3 items-center font-semibold">
                    <img
                      src="https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/icons/__Support.svg"
                      loading="lazy"
                      alt="icon"
                      width="15%"
                    />
                    Additional Support
                  </div>
                  <div className="mt-5 text-sm text-slate-400">
                    Account management services, exclusive training programs,
                    business insights, catalogue/photoshoot support, and more.
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden col-span-1 lg:flex">
              <img
                src="https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/images/shopsy_1_1.webp"
                alt="img"
                width={250}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellOnlineMainPage;
