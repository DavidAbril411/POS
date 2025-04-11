import axios from "axios";

// Crear la instancia base de axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  // Cambiar a false para evitar el problema de CORS con credentials
  withCredentials: false,
});

// Interceptor para agregar el token de autenticación a las solicitudes
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message || error);
    return Promise.reject(error);
  },
);

export default api;
