import { User } from "@/types";
import api from "./api";

const authService = {
  login: async (username: string, password: string): Promise<User> => {
    try {
      // Conectar con el backend real
      console.log("Enviando solicitud de login al backend:", {
        username,
        password,
      });
      const response = await api.post("/auth/login", { username, password });
      console.log("Respuesta del backend:", response.data);

      // Guardar el token JWT en localStorage para futuras solicitudes
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Mapear la respuesta del backend a la estructura de User que usa el frontend
      const user: User = {
        id: response.data.userId,
        name: response.data.firstName || username,
        username: response.data.username,
        role: response.data.roleName,
      };

      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Credenciales inválidas o error de conexión");
    }
  },

  register: async (
    name: string,
    username: string,
    password: string,
  ): Promise<boolean> => {

    // Conectar con el backend real
    try {
      console.log("Enviando solicitud de registro al backend:", {
        firstName: name,
        username,
        password,
      });

      const response = await api.post("/auth/register", {
        firstName: name,
        username,
        password,
      });

      console.log("Respuesta del backend para registro:", response.data);

      // Verificar si la respuesta indica éxito
      return response.data.success === true;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error(
        error.response?.data?.message || "Error al registrar el usuario",
      );
    }
  },

  // Método para cerrar sesión y eliminar el token
  logout: async (): Promise<void> => {
    // Eliminar token del localStorage
    localStorage.removeItem("token");

    // Intentar notificar al backend sobre el cierre de sesión si existe un endpoint para ello
    try {
      // Esta llamada es opcional, solo si tu backend tiene un endpoint de logout
      // Si no existe, simplemente comenta esta línea
      await api.post("/auth/logout");
    } catch (error) {
      // Ignorar errores en el logout del backend
      console.log("Sesión cerrada localmente");
    }
  },
};

export default authService;
