import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
  CircularProgress,
  Alert,
  Fade,
} from '@mui/material';
import NextLink from 'next/link';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { register, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validaciones
    if (!name || !username || !password) {
      setError('Por favor complete todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const success = await register(name, username, password);
      if (success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else {
        setError('Error al registrar usuario');
      }
    } catch (err) {
      setError('Ocurrió un error durante el registro');
    }
  };

  return (
    <Fade in={true} timeout={800}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Card 
          sx={{ 
            maxWidth: 400, 
            width: '100%',
            mx: 2,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" color="primary.main">
              Registro
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Registro exitoso! Redirigiendo al inicio de sesión...
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading || success}
              />

              <TextField
                label="Usuario"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading || success}
              />

              <TextField
                label="Contraseña"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || success}
              />

              <TextField
                label="Confirmar Contraseña"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading || success}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                disabled={loading || success}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
              </Button>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2">
                ¿Ya tienes una cuenta?{' '}
                <Link component={NextLink} href="/auth/login">
                  Iniciar Sesión
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default RegisterPage;
