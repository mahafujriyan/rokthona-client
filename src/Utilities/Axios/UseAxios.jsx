import axios from 'axios';

const useAxios = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: false, 
  });

  // Add token to headers if available
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export default useAxios;
