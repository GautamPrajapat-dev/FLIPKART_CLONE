import { useEffect, useRef, useState } from "react";
import DashboardNavbar from "../SellerComponents/DashboardNavbar";

import FormInputIcon from "../../../Components/FormInputIcon";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { SellerAuthActionRequest } from "../../../Stores/Saga/Actions/SellerAuthAction";
const UpdateUserDetails = () => {
  const formref = useRef();
  const { details } = useSelector((state) => state.Seller);
  const { user } = useSelector((state) => state.Seller.profile.data);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    // Set initial form values from the user details
    if (user) {
      setFormValues({
        firstname: user?.fname,
        surname: user?.lname,
        mobile: user?.mobile,
        email: user?.email,
        "fullAddress[state]": user?.fullAddress?.state,
        "fullAddress[address]": user?.fullAddress?.address,
        "fullAddress[city]": user?.fullAddress?.city,
        "fullAddress[pincode]": user?.fullAddress?.pincode,
        "fullAddress[country]": user?.fullAddress?.country,
        "bussinessDetail[bussinessName]": user?.bussinessDetail?.bussinessName,
        "bussinessDetail[company]": user?.bussinessDetail?.company,
        "bussinessDetail[companyAddress[state]]":
          user?.bussinessDetail?.companyAddress?.state,
        "bussinessDetail[companyAddress[address]]":
          user?.bussinessDetail?.companyAddress?.address,
        "bussinessDetail[companyAddress[city]]":
          user?.bussinessDetail?.companyAddress?.city,
        "bussinessDetail[companyAddress[pincode]]":
          user?.bussinessDetail?.companyAddress?.pincode,
        "bussinessDetail[companyAddress[country]]":
          user?.bussinessDetail?.companyAddress?.country,
        "bussinessDetail[panNum]": user?.bussinessDetail?.panNum,
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: SellerAuthActionRequest.UPDATE_SELLER_DETAILS_SAGA_REQUEST,
      payload: formref.current,
    });
  };
  useEffect(() => {
    if (details !== undefined) {
      if (details.status && details.status === true) {
        setTimeout(() => (window.location.href = "/dashboard/profile"), 1000);
      }
    }
  }, [details, dispatch]);
  return (
    <>
      <ToastContainer />
      <div className="relative ">
        <DashboardNavbar name="Update Details" />
        <div className="mt-7">
          <form
            onSubmit={handleSubmit}
            method="PUT"
            content="multipart/from-data"
            ref={formref}
          >
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {formlist.map((form, i) => {
                return (
                  <FormInputIcon
                    key={i}
                    variant="sm-outlined"
                    className={`text-personal-800 placeholder:text-personal-900/50 border-personal-300 `}
                    type={form.type}
                    name={form.name}
                    id={form.name}
                    placeholder={form.placeholder}
                    passwordClassName="text-personal-900"
                    iconClassName="text-personal-900"
                    label={form.label}
                    defaultValue={formValues[form.name] || ""}
                  />
                );
              })}
            </div>

            <button
              type="submit"
              className="w-full mt-4 text-white btn btn-outline bg-personal-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUserDetails;
const formlist = [
  {
    name: "firstname",
    placeholder: "firstname",
    type: "text",
    label: "First Name",
  },
  {
    name: "surname",
    placeholder: "lastname",
    type: "text",
    label: "Last Name",
  },
  {
    name: "mobile",
    placeholder: "eg. +91 00 0000 000",
    type: "number",
    label: "Mobile",
  },
  {
    name: "email",
    placeholder: "abc@gmail.com",
    type: "email",
    label: "Email",
  },
  {
    name: "fullAddress[state]",
    placeholder: "state",
    type: "text",
    label: "State",
  },

  {
    name: "fullAddress[address]",
    placeholder: "Enter Your Address",
    type: "text",
    label: "Address",
  },

  {
    name: "fullAddress[city]",
    placeholder: "city",
    type: "text",
    label: "city",
  },

  {
    name: "fullAddress[pincode]",
    placeholder: "pincode",
    type: "number",
    label: "Pin Code",
  },
  {
    name: "fullAddress[country]",
    placeholder: "country Name",
    type: "text",
    label: "Country",
  },
  {
    name: "bussinessDetail[bussinessName]",
    placeholder: "Enter Your Bussiness Name",
    type: "text",
    label: "Bussiness Name",
  },
  {
    name: "bussinessDetail[company]",
    placeholder: "Enter Your Company Name",
    type: "text",
    label: "Company Name",
  },

  {
    name: "bussinessDetail[companyAddress[state]]",
    placeholder: "Company State",
    type: "text",
    label: "Company State",
  },

  {
    name: "bussinessDetail[companyAddress[address]]",
    placeholder: "Company address",
    type: "text",
    label: "Company Address",
  },
  {
    name: "bussinessDetail[companyAddress[city]]",
    placeholder: "City",
    type: "text",
    label: "Company City",
  },
  {
    name: "bussinessDetail[companyAddress[pincode]]",
    placeholder: "Pincode",
    type: "number",
    label: "Company Pincode",
  },
  {
    name: "bussinessDetail[companyAddress[country]]",
    placeholder: "country",
    type: "number",
    label: "Company country",
  },
  {
    name: "bussinessDetail[panNum]",
    placeholder: "eg. BAXXC4350M",
    type: "text",
    label: "Pan Card Number",
  },
];

// {
//   "mobile": "7067587386",
//   "firstname": "Goutam",
//   "surname": "Prajapat",
//   "email": "gprjapat1@gmail.com",
//   "fullAddress": {
//       "state": "madhya predesh",
//       "address": "Ward No. 11 Tailiwada, Mahalaxmi Temple Near",
//       "city": "Shajapur",
//       "pincode": "456001",
//       "country": "India"
//   },
//   "bussinessDetail": {
//       "bussinessName": "Gautam Prajapat",
//       "company": "Prajapat Electronics",
//       "companyAddress": {
//           "state": "madhya predesh",
//           "address": "Mhatama Gandi road",
//           "city": "Nagda",
//           "pincode": "456001",
//           "country": "India"
//       },
//       "panNum": "GFQJR7008X"
//   }
// }
