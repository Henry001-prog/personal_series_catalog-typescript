import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.108:3002/api",
});

const oapi = axios.create({
  baseURL: "http://192.168.0.108:3002/oapi",
});

export const seriesApi = { api, oapi };