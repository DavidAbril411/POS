import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const NavBar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    router.push("/");
  };

  const handleNavigate = (path: string) => {
    handleMenuClose();
    router.push(path);
  };

  if (!isAuthenticated) return null;

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => router.push("/dashboard")}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          POS System
        </Typography>

        {isAuthenticated && (
          <Box>
            <Button
              color="inherit"
              onClick={handleMenuOpen}
              startIcon={<AccountCircleIcon />}
            >
              {user?.name || "Usuario"}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Avatar sx={{ mx: "auto", mb: 1, bgcolor: "primary.main" }}>
                  {user?.name?.charAt(0) || "U"}
                </Avatar>
                <Typography variant="subtitle1">{user?.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.role}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={() => handleNavigate("/dashboard")}>
                Panel Principal
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
