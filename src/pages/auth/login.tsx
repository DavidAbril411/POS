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

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor complete todos los campos');
      return;
    }

    try {
      const success = await login(username, password);
      if (!success) {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      setError('Ocurrió un error durante el inicio de sesión');
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
              Iniciar Sesión
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                label="Usuario"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />

              <TextField
                label="Contraseña"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
              </Button>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2">
                ¿No tienes una cuenta?{' '}
                <Link component={NextLink} href="/auth/register">
                  Regístrate
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default LoginPage;
