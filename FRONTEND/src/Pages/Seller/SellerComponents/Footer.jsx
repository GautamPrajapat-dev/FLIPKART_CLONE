import React from "react";
import { NavLink } from "react-router-dom";
import {
  CiCircleQuestion,
  CiFacebook,
  CiGift,
  CiShop,
  CiStar,
  CiTwitter,
  CiYoutube,
} from "react-icons/ci";
const Footer = () => {
  return (
    <div className="w-full px-2 py-3 mx-auto mt-1 bg-personal-910 text-purple-50">
      <div className="grid grid-cols-11 divide-y md:divide-y-0 md:divide-x ">
        {/* left Bar */}
        <div className="col-span-11 md:col-span-7">
          <div className="flex flex-wrap justify-around w-full gap-3 p-4 ">
            <div className="flex flex-col gap-3">
              <div className="text-sm text-personal-100">About</div>
              <div className="flex flex-col text-xs">
                <NavLink>Contact Us</NavLink>
                <NavLink>About Us</NavLink>
                <NavLink>Careers</NavLink>
                <NavLink>Flipkart Stories</NavLink>
                <NavLink>Press</NavLink>
                <NavLink>Corporate Information</NavLink>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-sm text-personal-100">Group Companies</div>
              <div className="flex flex-col text-xs">
                <NavLink>Myntra</NavLink>
                <NavLink>Flipkart Wholesale</NavLink>
                <NavLink>Cleartrip</NavLink>
                <NavLink>Shopsy</NavLink>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-sm text-personal-100">Help</div>
              <div className="flex flex-col text-xs">
                <NavLink>Payments</NavLink>
                <NavLink>Shipping</NavLink>
                <NavLink>Cancellation & Returns</NavLink>
                <NavLink>FAQ</NavLink>
                <NavLink>Report Infringemnet</NavLink>
              </div>
            </div>
            <div className="flex flex-col gap-3 ">
              <div className="text-sm text-personal-100">Consumer Policy</div>
              <div className="flex flex-col text-xs">
                <NavLink>Cancellation & Return</NavLink>
                <NavLink>Terms Of Use</NavLink>
                <NavLink>Security</NavLink>
                <NavLink>Privacy</NavLink>
                <NavLink>Sitemap</NavLink>
                <NavLink>Grievance Redressel</NavLink>
                <NavLink>EPR Compliance</NavLink>
              </div>
            </div>
          </div>
        </div>
        {/* Right Bar */}
        <div className="col-span-11 md:col-span-4">
          <div className="flex flex-wrap gap-4 p-4 ">
            <div className="flex flex-col gap-3 ">
              <div className="text-sm text-personal-100">Mail Us :</div>
              <div className="text-xs">
                Flipkart Internet Private Limited,buildings Alyssa Begonia &
                Clove Embassy Tech Village, Outer Ring Road,Devarabeesanahalli
                Village,Bengaluru, 560103,karnataka, India
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-sm text-personal-100">
                Register Office Address :
              </div>
              <div className="text-xs">
                Flipkart Internet Private Limited,buildings Alyssa Begonia &
                Clove Embassy Tech Village, Outer Ring Road,Devarabeesanahalli
                Village,Bengaluru, 560103,karnataka, India
                <span>TelePhone: 345-56-3534-34345</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-sm text-personal-100">Social :</div>
              <div className="flex gap-3 text-2xl">
                <NavLink>
                  <CiFacebook />
                </NavLink>
                <NavLink>
                  <CiTwitter />
                </NavLink>
                <NavLink>
                  <CiYoutube />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* bottom section */}
      <div className="py-4 border-t">
        <div className="flex flex-wrap items-center justify-around gap-3 text-sm ">
          <div className="flex items-center gap-2">
            <CiShop /> Become A Seller
          </div>
          <div className="flex items-center gap-2">
            <CiStar /> Advertise
          </div>
          <div className="flex items-center gap-2">
            <CiGift /> Gift Cards
          </div>
          <div className="flex items-center gap-2">
            <CiCircleQuestion /> Help Center
          </div>
          <div>&#169; 2007-2024 Fliplart.com</div>
          <div>
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"
              alt="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
