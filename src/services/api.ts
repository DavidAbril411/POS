import axios from 'axios';
import Cookies from 'js-cookie';

// Función para obtener la URL base según el entorno
const getBaseURL = () => {
  // En desarrollo, usar una URL local o mock
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
  }
  // En producción, usar la URL de producción
  return process.env.NEXT_PUBLIC_API_URL || '/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token de autenticación
api.interceptors.request.use(
  (config) => {
    const user = Cookies.get('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.token) {
          config.headers.Authorization = `Bearer ${userData.token}`;
        }
      } catch (error) {
        console.error('Error parsing user data from cookie', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
