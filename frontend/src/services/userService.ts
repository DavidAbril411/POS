import { User } from "@/types";
import api from "./api";

const userService = {
    // Obtener todos los usuarios (solo para administradores)
    getAllUsers: async (): Promise<User[]> => {
        try {
            const response = await api.get("/users");
            return response.data;
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            throw new Error("Error al cargar los usuarios");
        }
    },

    // Crear un nuevo usuario administrador
    createAdminUser: async (
        firstName: string,
        username: string,
        password: string,
    ): Promise<User> => {
        try {
            const response = await api.post("/users/admin", {
                firstName,
                username,
                password,
                roleName: "Administrador",
            });

            return response.data;
        } catch (error) {
            console.error("Error al crear administrador:", error);
            throw new Error(
                error.response?.data?.message ||
                    "Error al crear usuario administrador",
            );
        }
    },

    // Eliminar un usuario
    deleteUser: async (userId: number): Promise<void> => {
        try {
            await api.delete(`/users/${userId}`);
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            throw new Error("Error al eliminar el usuario");
        }
    },
};

export default userService;
