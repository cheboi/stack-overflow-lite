import axios from "axios";
import authHeader from "./auth.header";

// const API_URL = "endpoint";

const getPublicContent = () => {
//   return axios.get(API_URL + "all");
};

const getUserBoard = () => {
//   return axios.get(API_URL + "user", { headers: authHeader() });
};

const userService = {
  getPublicContent,
  getUserBoard,
};

export default userService;
