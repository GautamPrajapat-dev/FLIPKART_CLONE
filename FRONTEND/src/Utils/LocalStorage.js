const token = "_token";
const publicTokken = "-token-x-public";
export const getTokenLocalStorageSeller = () => {
  return localStorage.getItem(token);
};
export const clearTokenLocalStorageSeller = () => {
  return localStorage.removeItem(token);
};
export const getTokenLocalStoragePublic = () => {
  return localStorage.getItem(publicTokken);
};
export const clearTokenLocalStoragePublic = () => {
  return localStorage.removeItem(publicTokken);
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
