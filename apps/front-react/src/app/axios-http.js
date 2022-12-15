import axios from "axios";

const AXIOS = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    Authorization: ``,
  },
});

export const setAuthToken = (token) => {
  if (token) {
    AXIOS.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else delete AXIOS.defaults.headers["Authorization"];
};

export { AXIOS };
