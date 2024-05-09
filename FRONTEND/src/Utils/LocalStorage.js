const token = "_token";

export const getTokenLocalStorageSeller = () => {
  return localStorage.getItem(token);
};
export const clearTokenLocalStorageSeller = () => {
  return localStorage.removeItem(token);
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
