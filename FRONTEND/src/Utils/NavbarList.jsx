import {
  IoBagAddOutline,
  IoBagOutline,
  IoCartOutline,
  IoHelp,
  IoNewspaperOutline,
} from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";
import { MdOutlineDiscount, MdOutlineLocalOffer } from "react-icons/md";
import { IoMdHeart, IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineShop } from "react-icons/ai";
import { LuUser2 } from "react-icons/lu";
export const publicNavList = [
  {
    link: "All Catagories",
    icon: <CiBoxes />,
    to: "/catagories",
  },
  {
    link: "Trending Stores",
    icon: <AiOutlineShop />,
    to: "/topstores",
  },
  {
    link: "Offer Zone",
    icon: <MdOutlineLocalOffer />,
    to: "/offers",
  },
  {
    link: "Sell On Flipkart",
    icon: <IoBagOutline />,
    to: "/seller",
  },
  {
    link: "My Orders",
    icon: <IoBagAddOutline />,
    to: "/my-orders",
  },
  {
    link: "Coupons",
    icon: <MdOutlineDiscount />,
    to: "/coupons",
  },
  {
    link: "My Cart",
    icon: <IoCartOutline />,
    to: "/cart",
  },
  {
    link: "My Whitelist",
    icon: <IoMdHeart />,
    to: "/whitelist",
  },
  {
    link: "My Account",
    icon: <LuUser2 />,
    to: "/my-account",
  },
  {
    link: "My Notifications",
    icon: <IoMdNotificationsOutline />,
    to: "/notification",
  },
  {
    link: "Help Center",
    icon: <IoHelp />,
    to: "/help-center",
  },
  {
    link: "Legal",
    icon: <IoNewspaperOutline />,
    to: "/legal",
  },
];
