import axios from 'axios';

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

customAxios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken !== null) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default customAxios;
