// this file for API configuration
import axios from "axios";
export const jsonplaceholder = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
