import axios from "axios";

export const AXIOS = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};
