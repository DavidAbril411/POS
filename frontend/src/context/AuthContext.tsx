import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { User, AuthContextType } from "@/types";
import authService from "@/services/authService";

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isAuthenticated: false,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar si hay un usuario en cookies al cargar
    const storedUser = Cookies.get("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from cookie", error);
        Cookies.remove("user");
        localStorage.removeItem("token"); // También eliminar el token si hay error
      }
    }
    setLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const userData = await authService.login(username, password);

      // Guardar la información del usuario en cookies para persistencia
      setUser(userData);
      Cookies.set("user", JSON.stringify(userData), { expires: 7 });

      router.push("/dashboard");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name: string,
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      await authService.register(name, username, password);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Llamar al servicio de autenticación para cerrar sesión
      await authService.logout();

      // Limpiar estado local
      setUser(null);
      Cookies.remove("user");

      // Opcional: redirigir al usuario (ahora lo hacemos desde el NavBar)
      // router.push('/');

      return true;
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
