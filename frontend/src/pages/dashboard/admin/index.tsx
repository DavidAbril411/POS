import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Alert,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";
import userService from "@/services/userService";
import { User } from "@/types";

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [newAdmin, setNewAdmin] = useState({
    firstName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Verificar que el usuario sea administrador
    if (isAuthenticated && user?.role !== "Administrador") {
      router.push("/dashboard");
      return;
    }

    // Cargar usuarios si el usuario es administrador
    if (isAuthenticated && user?.role === "Administrador") {
      loadUsers();
    }
  }, [isAuthenticated, user, router]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setFormError("");
    setFormSuccess("");
    setNewAdmin({
      firstName: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDeleteDialog = (userId: number) => {
    setSelectedUserId(userId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedUserId(null);
    setOpenDeleteDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAdmin({
      ...newAdmin,
      [name]: value,
    });
  };

  const handleCreateAdmin = async () => {
    setFormError("");
    setFormSuccess("");

    // Validaciones
    if (!newAdmin.firstName || !newAdmin.username || !newAdmin.password) {
      setFormError("Por favor complete todos los campos");
      return;
    }

    if (newAdmin.password !== newAdmin.confirmPassword) {
      setFormError("Las contraseñas no coinciden");
      return;
    }

    try {
      await userService.createAdminUser(
        newAdmin.firstName,
        newAdmin.username,
        newAdmin.password
      );
      setFormSuccess("Administrador creado exitosamente");

      // Recargar usuarios después de crear uno nuevo
      loadUsers();

      // Cerrar el diálogo después de un tiempo
      setTimeout(() => {
        handleCloseDialog();
      }, 2000);
    } catch (err) {
      setFormError(err.message || "Error al crear administrador");
    }
  };

  const handleDeleteUser = async () => {
    if (selectedUserId === null) return;

    try {
      await userService.deleteUser(selectedUserId);
      // Actualizar la lista de usuarios después de eliminar
      setUsers(users.filter((user) => user.id !== selectedUserId));
      handleCloseDeleteDialog();
    } catch (err) {
      setError("Error al eliminar usuario");
      handleCloseDeleteDialog();
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" color="primary">
          Panel de Administración
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Nuevo Administrador
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Gestión de Usuarios
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          color={
                            user.role === "Administrador"
                              ? "primary"
                              : "default"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => handleOpenDeleteDialog(user.id)}
                          disabled={
                            user.id === isAuthenticated ? user.id : false
                          } // Evitar eliminar usuario actual
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No hay usuarios para mostrar
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Diálogo para crear administrador */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PersonAddIcon sx={{ mr: 1 }} color="primary" />
            Crear Nuevo Administrador
          </Box>
        </DialogTitle>
        <DialogContent>
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}
          {formSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {formSuccess}
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            name="firstName"
            label="Nombre"
            type="text"
            fullWidth
            variant="outlined"
            value={newAdmin.firstName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="username"
            name="username"
            label="Usuario"
            type="text"
            fullWidth
            variant="outlined"
            value={newAdmin.username}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            fullWidth
            variant="outlined"
            value={newAdmin.password}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            fullWidth
            variant="outlined"
            value={newAdmin.confirmPassword}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancelar
          </Button>
          <Button
            onClick={handleCreateAdmin}
            color="primary"
            variant="contained"
          >
            Crear Administrador
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea eliminar este usuario? Esta acción no se
            puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;
