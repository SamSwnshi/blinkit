import axios from 'axios';

import SummaryApi , { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL : baseURL,
    withCredentials : true
})


Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accesstoken"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default Axios;