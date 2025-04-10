import { useEffect, useState } from 'react';
import { Button, Box, Typography, keyframes } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

// Keyframes para la animación de flotación
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const LandingPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleGetStarted = () => {
    router.push('/auth/login');
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '80vh',
      }}
    >
      <Box
        sx={{
          animation: loaded ? `${float} 3s ease-in-out infinite` : 'none',
          p: 4,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 300,
            color: 'primary.dark',
            textShadow: '0 2px 10px rgba(79, 195, 247, 0.2)',
          }}
        >
          Bienvenido al Software POS
        </Typography>
        
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            fontWeight: 300,
            color: 'text.secondary',
          }}
        >
          La solución completa para gestionar su negocio
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGetStarted}
          sx={{
            mt: 3,
            fontSize: '1.2rem',
            transition: 'all 0.3s',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 6px 10px rgba(79, 195, 247, 0.3)',
            },
          }}
        >
          Comencemos...
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
