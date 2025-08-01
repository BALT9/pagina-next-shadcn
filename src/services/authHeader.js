import api from "./axios";

export const setAuthHeader = (token) => {
//   console.log("setAuthHeader token recibido:", token);
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
//   console.log("api.defaults.headers.common['Authorization'] es ahora:", api.defaults.headers.common['Authorization']);
};
