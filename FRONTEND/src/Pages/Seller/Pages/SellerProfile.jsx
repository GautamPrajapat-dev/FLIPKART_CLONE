import React, { useEffect, useState } from "react";
import DashboardNavbar from "../SellerComponents/DashboardNavbar";

import { useDispatch, useSelector } from "react-redux";
import ModalOutsideClick from "../../../Components/ModalOutsideClick";

import { SellerAuthActionRequest } from "../../../Stores/Saga/Actions/SellerAuthAction";

const SellerProfile = () => {
  const dispatch = useDispatch();
  const [modelprofile, setUpdateProfile] = useState(false);
  const [sellerProfile, setSellerProfile] = useState();
  const [profileImg, setProfileImg] = useState("");
  const profile = useSelector((state) => state.Seller);

  const avatar = useSelector((state) => state.Seller.avatar);
  const { isLoading } = useSelector((state) => state.loading);
  const user = profile?.profile;
  const updateProfile = (e) => {
    setSellerProfile(e.target.files[0]);
    setProfileImg(URL.createObjectURL(e.target.files[0]));
  };
  const updateProfileSeller = () => {
    const from = new FormData();
    from.append("avatar", sellerProfile);
    dispatch({
      type: SellerAuthActionRequest.UPDATE_PROFILE_SAGA_REQUEST,
      payload: from,
    });
  };

  useEffect(() => {
    if (avatar && avatar?.status === true) {
      dispatch({ type: SellerAuthActionRequest.SELLER_PROFILE_SAGA_REQUEST });
      setUpdateProfile(false);
    }
  }, [avatar?.status, avatar, dispatch, setUpdateProfile]);

  return (
    <>
      <DashboardNavbar name="Profile" />
      <div className="relative grid grid-cols-12 mt-5">
        {isLoading && (
          <div className="absolute z-50 flex items-center justify-center w-full h-screen bg-white ">
            <div>
              <div className="w-12 bg-purple-500 loading loading-spinner"></div>
            </div>
          </div>
        )}
        <div className="flex flex-col col-span-12 gap-6 mx-auto md:col-span-4">
          <div className="w-24 md:w-32 lg:w-auto avatar">
            <div className="rounded-full ">
              <img
                src={user?.data?.user?.avatar?.path}
                className="peer"
                alt="img"
                loading="lazy"
              />
            </div>
          </div>
          <div
            className="btn btn-outline"
            onClick={
              () => setUpdateProfile(true)
              // document.getElementById("update_profile").showModal()
            }
          >
            Update Profile
          </div>
          <ModalOutsideClick
            id="update_profile"
            open={modelprofile ? "modal-open" : ""}
          >
            <div className="flex flex-col gap-4">
              <form className="flex items-center space-x-6">
                <div className="avatar">
                  <div className="w-32">
                    <img
                      className="object-cover w-16 h-16 rounded-full"
                      src={
                        profileImg !== ""
                          ? profileImg
                          : "https://cdn.icon-icons.com/icons2/3214/PNG/512/cloud_file_upload_server_icon_196427.png"
                      }
                      alt="update_profile"
                    />
                  </div>
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    onChange={updateProfile}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
                  />
                </label>
                <button
                  type="reset"
                  className="btn btn-circle"
                  onClick={() =>
                    setProfileImg(
                      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                    )
                  }
                >
                  X
                </button>
              </form>
              <div className="flex gap-4">
                <div
                  className="w-3/4 btn btn-secondary"
                  onClick={updateProfileSeller}
                >
                  Update
                </div>
                <button
                  className="w-2/12 btn btn-danger"
                  onClick={() => setUpdateProfile(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </ModalOutsideClick>
        </div>

        <div className="col-span-12 mt-6 divide-y max-sm:flex-col max-sm:items-center md:col-span-6">
          <div className="max-sm:items-center max-sm:flex max-sm:flex-col ">
            <div className="text-4xl font-semibold">
              {user?.data?.user?.fullname}
            </div>
            <div>
              Phone : <span>{user?.data?.user?.mobile}</span>
            </div>
            <div>
              Email : <span>{user?.data?.user?.email}</span>
            </div>
          </div>
          <div className="pt-3 mt-3">
            <div>
              <div className="font-bold text-daintree-400 text-1xl">
                Address
              </div>
              <div className="mt-2">
                {user?.data?.user?.fullAddress?.address}{" "}
                {user?.data?.user?.fullAddress?.city},
              </div>
              <div>
                {user?.data?.user?.fullAddress?.state}{" "}
                {user?.data?.user?.fullAddress?.pincode}
              </div>
              <div>{user?.data?.user?.fullAddress?.country}</div>
            </div>
          </div>
          <div className="pt-3 mt-3">
            <div className="">
              <div className="font-bold text-daintree-400 text-1xl">
                Bussiness Details
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <div>
                  Company : {user?.data?.user?.bussinessDetail?.company}
                </div>
                <div>GSTIN : {user?.data?.user?.gstNum}</div>
              </div>
              <div className="mt-3 ">
                <div className="font-bold text-daintree-400 text-1xl">
                  Bussiness Address
                </div>
                <div>
                  <div className="mt-2">
                    {user?.data?.user?.bussinessDetail?.companyAddress?.address}{" "}
                    {user?.data?.user?.bussinessDetail?.companyAddress?.city},
                  </div>
                  <div>
                    {user?.data?.user?.bussinessDetail?.companyAddress?.state}{" "}
                    {user?.data?.user?.bussinessDetail?.companyAddress?.pincode}
                  </div>
                  <div>
                    {user?.data?.user?.bussinessDetail?.companyAddress?.country}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerProfile;
