// Definición de tipos para usuarios y autenticación
export interface User {
  id?: number;
  name: string;
  username: string;
  password?: string;
  role: 'ADMIN' | 'EMPLOYEE';
}

export type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (name: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};
