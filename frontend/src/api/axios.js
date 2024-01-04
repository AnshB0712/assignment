import axios from "axios";

export const BASE_URL = "http://localhost:3000/v1";

const customAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default customAxios;
