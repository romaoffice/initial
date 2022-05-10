import axios from "axios";
import authHeader from "./auth-header";
import config from "./config"

const API_URL = config.endpoint()+"/api/hopper/";

const getList = () => {
  return axios.get(API_URL + "list", { headers: authHeader() });
};

const getItem = (id) => {
  return axios.get(API_URL + "detail?id="+id, { headers: authHeader() });
};
const deleteItem = (id) => {
  return axios.get(API_URL + "delete?id="+id, { headers: authHeader() });
};
const addItem = (data) => {
  return axios.post(API_URL + "add",data, { headers: authHeader() });
};
const updateItem = (id,data) => {
  return axios.post(API_URL + "edit?id="+id,data, { headers: authHeader() });
};

export default {
  getList,
  getItem,
  deleteItem,
  addItem,
  updateItem
};