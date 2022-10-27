import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonmock.hackerrank.com/api",
});
