import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

export default http;
