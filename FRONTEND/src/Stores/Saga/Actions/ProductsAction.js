export const productActionRequest = {
  REMOVE_WHITELIST_REQUEST_SAGA: "product/REMOVE_WHITELIST_SAGA",
};

export const productActionSuccess = {
  CATEGORY_REQUEST_SUCCESS: "product/CATEGORY_REDUX",
  SUB_CATEGORY_REQUEST_SUCCESS: "product/SUBCATEGORY_WITH_PRODUCTS",
  SUB_CATEGORY_ALL_DATA_REQUEST_SUCCESS:
    "product/SUBCATEGORY_WITH_ALL_PRODUCTS",
  GET_WHITELIST_SUCCESS: "product/GET_WHITELIST",
  ADD_WHITELIST_SUCCESS: "product/ADD_WHITELIST",
  REMOVE_WHITELIST_SUCCESS: "product/REMOVE_WHITELIST",
};

const CategoryRequestSaga = (data) => {
  return {
    type: "product/CATEGORY_REDUX_SAGA",
    payload: data,
  };
};
const SubCategoryReqSaga = (data) => {
  return {
    type: "product/SUBCATEGORY_WITH_PRODUCTS_SAGA",
    payload: data,
  };
};
const SubCategoryDataSaga = (data) => {
  return {
    type: "product/SUBCATEGORY_WITH_ALL_PRODUCTS_SAGA",
    payload: data,
  };
};
const GetWhiteListReqSaga = (data) => {
  return {
    type: "product/GET_WHITELIST_SAGA",
    payload: data,
  };
};
const AddWhiteListReqSaga = (data) => {
  return {
    type: "product/ADD_WHITELIST_SAGA",
    payload: data,
  };
};

export {
  SubCategoryReqSaga,
  AddWhiteListReqSaga,
  CategoryRequestSaga,
  SubCategoryDataSaga,
  GetWhiteListReqSaga,
};
