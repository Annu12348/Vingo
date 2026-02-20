import axios from "axios";


const instance = axios.create({
  baseURL: "https://vingo-backend.onrender.com",
});

export default instance;