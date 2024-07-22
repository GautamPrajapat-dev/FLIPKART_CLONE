const publicToken =
  "vT6sGzIEYbcjDaZX8Xt7TO74lWKrw9W2hmCYgwaIrUCBpjzOPV0DdpJ7Prmkj7Tr50QMELWdlwDWcWjY30CH2W4Jah41vXM0XbzdBH1fsEBqL3qZaORQZctYQt1sxaem89f9HicjvmfDYOLx3WSCjRB8E9RxJUMgTHvPo6P3x5Tovktj7HR7YYiOfv8UxAqh2pvQp88Wzcb6kt63sGrCW8kVBLp33UFictHLoTsodGl9LJBFgv7xj7VTJWCMF6otxTGQ7UDjST4BL";
const token =
  "H8k3dKmrC6patm3qmaJd03kAmybeTLVfFGJeieqWbg86ArtH044BhU0VMjEDXcqQEhSiA7ETxyae317rkrLDjqWLWWRddYzeD5sA75B94o0jiQPIj8PHhqlUFAj3s5Js0TsoIIhOT5HOeazZc4T5uI3hC327cWxUrR7OYLEBdsho8fFVRqrpVgvk0x8JB9Q9ZLJvWxT1wEDuf55gYY1akimsO1xHTEus4kEBc5qzkapC3pcHhpkW4z5eQtPetCUrUMEoERXWq39exYWXM9FePTBGvgFjIf38IBA3D9iI9EPvRtZpjFSDz9O27JkB03Zyxyi96l3H6p09PVeALy3o56Qa79GsTgTxjm3iwcG2QkaiyVC9mYd62oadhuUmp8mqPTCUxHrewhZzIIEul2L7dg9oiy7y4FOuFgTDqDCvA4lUPyicS8pWQd4d3rT3GrPD7YFMhX1Db3cocOXi70p0dI3RfRtJsBiD1myq1FopWJAgIjt9R89GAaXGJOCEiVTJfRv";
export const getTokenLocalStorageSeller = () => {
  return localStorage.getItem(token);
};
export const clearTokenLocalStorageSeller = () => {
  return localStorage.removeItem(token);
};
export const getTokenLocalStoragePublic = () => {
  return localStorage.getItem(publicToken);
};
export const clearTokenLocalStoragePublic = () => {
  return localStorage.removeItem(publicToken);
};
export const setTokenLocalStoragePublic = (t) => {
  return localStorage.setItem(publicToken, t);
};
export const setTokenLocalStorageSeller = (t) => {
  return localStorage.setItem(token, t);
};
export const setLocalStorage = (key, t) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, t);
};

export const getTokenLocalStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};
