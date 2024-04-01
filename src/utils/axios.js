import axios from "axios";

const axiosClient = axios.create({
  baseURL: "94.74.86.174:8080/api",
});

export default axiosClient;
