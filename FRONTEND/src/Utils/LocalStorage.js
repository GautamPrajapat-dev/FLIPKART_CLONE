const token = "_token";

export const getTokenLocalStorage = () => {
  return localStorage.getItem(token);
};
export const clearTokenLocalStorage = () => {
  return localStorage.clear(token);
};
export const setLocalStorage = (key, t) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, t);
};
