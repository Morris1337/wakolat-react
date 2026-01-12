import axios from 'axios';

const API_WAK = axios.create({
  baseURL: process.env.REACT_APP_WAKOLAT_API_URL, // например: https://wakolat.lv/api
  withCredentials: true,
});

API_WAK.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API_WAK;
