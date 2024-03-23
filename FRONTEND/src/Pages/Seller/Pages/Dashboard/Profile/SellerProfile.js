import React, { useEffect } from "react";
import DashboardNavbar from "../../../SellerComponents/DashboardNavbar";
import FormInput from "../../../../../Components/Inputs/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { SELLER_PROFILE_SAGA } from "../../../../../Stores/Slice/Seller.Auth.Slice";

const SellerProfile = () => {
  const profile = useSelector((state) => state.Seller);
  const user = profile?.profile?.user;
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SELLER_PROFILE_SAGA());
  }, [dispatch]);
  return (
    <>
      <DashboardNavbar name="Profile" />
      <div className="grid-cols-12">
        <div className="col-span-4">
          <img src={} alt="img" />
        </div>

        <div className="mt-6 col-span-6">
          <div className="grid  grid-cols-4 gap-6">
            <div className="col-span-2">
              <FormInput variant="sm-outlined" label="Full Name" />
            </div>
            <div className="col-span-2">
              <FormInput variant="sm-outlined" label="Mobile" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerProfile;
