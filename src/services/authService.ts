import { User } from '@/types';
import api from './api';

// En desarrollo, simulamos la autenticación con datos locales
const mockUsers: User[] = [
  { id: 1, name: 'Administrador', username: 'admin', password: 'admin123', role: 'ADMIN' },
  { id: 2, name: 'Empleado', username: 'employee', password: 'emp123', role: 'EMPLOYEE' },
];

const authService = {
  login: async (username: string, password: string): Promise<User> => {
    // Para desarrollo local, simulamos la autenticación
    if (process.env.NODE_ENV === 'development') {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = mockUsers.find(
            (u) => u.username === username && u.password === password
          );
          
          if (user) {
            // Omitir la contraseña en la respuesta
            const { password, ...userWithoutPassword } = user;
            resolve(userWithoutPassword);
          } else {
            reject(new Error('Credenciales inválidas'));
          }
        }, 500);
      });
    }

    // Para producción, conectar con el backend real
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },

  register: async (name: string, username: string, password: string): Promise<void> => {
    // Para desarrollo local, simulamos el registro
    if (process.env.NODE_ENV === 'development') {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const existingUser = mockUsers.find((u) => u.username === username);
          
          if (existingUser) {
            reject(new Error('El nombre de usuario ya existe'));
          } else {
            // En un entorno real, esto sería manejado por el backend
            const newUser: User = {
              id: mockUsers.length + 1,
              name,
              username,
              password,
              role: 'EMPLOYEE', // Por defecto, nuevos usuarios son empleados
            };
            mockUsers.push(newUser);
            resolve();
          }
        }, 500);
      });
    }

    // Para producción, conectar con el backend real
    await api.post('/auth/register', { name, username, password });
  },
};

export default authService;
