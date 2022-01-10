import axios from "axios";

const jwtAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://api.panda.eli-beams.eu/"
      : process.env.PANDA_BACKEND_URL_DEVELOPMENT
      ? process.env.PANDA_BACKEND_URL_DEVELOPMENT
      : "http://localhost:5002/", //
  headers: {
    "Content-Type": "application/json",
  },
});
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === "Token is not valid") {
      console.log("Need to logout user");
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  }
);
export const setAuthToken = (token?: string) => {
  if (token) {
    jwtAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete jwtAxios.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
  }
};

export default jwtAxios;
