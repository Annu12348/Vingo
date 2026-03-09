import axios from "axios";


const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://food-delivery-app-rosy-ten.vercel.app";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export default instance;  