import axios from 'axios';

const useAxios = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:5000', // or your API endpoint
  });

  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export default useAxios;
