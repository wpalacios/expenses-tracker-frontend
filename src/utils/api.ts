import axios from "axios";

const BASE_URL = "http://localhost:3001"; // Adjust based on your backend setup

export const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchExchangeRates = async () => {
  const { data } = await axios.get("https://api.exchangerate.host/latest");
  return data;
};
