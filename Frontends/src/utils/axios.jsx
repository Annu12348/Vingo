import axios from "axios";


const instance = axios.create({
  baseURL: "http://localhost:3000" || "https://vingo-backend.onrender.com",
});

export default instance;  