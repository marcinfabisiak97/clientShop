import axios from "axios";
const BASE_URL ="https://apishop-at7j.onrender.com/api";
// const BASE_URL ="https://sweet-blancmange-037826.netlify.app/api"
// const BASE_URL = "http://localhost:5000/api"
const localStorageItem = localStorage.getItem("persist:root");
const TOKEN =
  localStorageItem &&
  JSON.parse(JSON.parse(localStorageItem).user).currentUser.accessToken;
export const publicRequest = axios.create({ baseURL: BASE_URL });
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
