import React, { useRef } from "react";
import DashboardNavbar from "../../SellerComponents/DashboardNavbar";

import FormInputIcon from "../../../../Components/FormInputIcon";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { UPDATE_SELLER_DETAILS_SAGA } from "../../../../Stores/Slice/Seller.Auth.Slice";
const UpdateUserDetails = () => {
  const formref = useRef();

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UPDATE_SELLER_DETAILS_SAGA(formref));
  };
  return (
    <>
      <ToastContainer />
      <div className="relative md:px-3 ">
        <DashboardNavbar name="Update Details" />
        <div className="mt-7">
          <form onSubmit={handleSubmit} method="post" ref={formref}>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {formlist.map((form, i) => {
                return (
                  <FormInputIcon
                    key={i}
                    variant="sm-outlined"
                    className={`text-personal-800 placeholder:text-personal-900/50 border-personal-300 `}
                    type={form.type}
                    name={form.name}
                    placeholder={form.placeholder}
                    passwordClassName="text-personal-900"
                    iconClassName="text-personal-900"
                    label={form.label}
                  />
                );
              })}
              <button type="submit">Submit</button>
            </div>
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
    type: "number",
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
