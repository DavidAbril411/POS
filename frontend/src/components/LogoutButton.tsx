import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

type LogoutButtonProps = {
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
};

const LogoutButton = ({
  variant = "contained",
  color = "error",
  size = "medium",
  fullWidth = false,
}: LogoutButtonProps) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      onClick={handleLogout}
      startIcon={<LogoutIcon />}
    >
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;
