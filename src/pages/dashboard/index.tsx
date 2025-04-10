import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  Fade,
} from '@mui/material';
import SellIcon from '@mui/icons-material/Sell';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import { useAuth } from '@/context/AuthContext';

const DashboardPage = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography>Cargando...</Typography>
      </Box>
    );
  }

  const menuOptions = [
    {
      title: 'Ventas',
      description: 'Gestionar ventas y transacciones',
      icon: <SellIcon fontSize="large" />,
      color: '#4caf50',
      path: '/dashboard/sales',
      roles: ['ADMIN', 'EMPLOYEE'],
    },
    {
      title: 'Stock',
      description: 'Administrar inventario y productos',
      icon: <InventoryIcon fontSize="large" />,
      color: '#2196f3',
      path: '/dashboard/inventory',
      roles: ['ADMIN', 'EMPLOYEE'],
    },
    {
      title: 'Recursos',
      description: 'Administrar empleados y permisos',
      icon: <GroupIcon fontSize="large" />,
      color: '#ff9800',
      path: '/dashboard/resources',
      roles: ['ADMIN'],
    },
  ];

  // Filtrar opciones según el rol del usuario
  const filteredOptions = menuOptions.filter((option) => 
    option.roles.includes(user.role)
  );

  return (
    <Fade in={true} timeout={800}>
      <Box>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" color="primary.main">
            Panel Principal
          </Typography>
          <Typography variant="subtitle1">
            Bienvenido, {user.name}
          </Typography>
        </Box>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Seleccione una opción para comenzar
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {filteredOptions.map((option, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: option.color, width: 56, height: 56 }}>
                          {option.icon}
                        </Avatar>
                      </Box>
                      <Typography variant="h6" component="h2" align="center" gutterBottom>
                        {option.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align="center">
                        {option.description}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2 }}>
                      <Button 
                        variant="outlined" 
                        fullWidth
                        onClick={() => router.push(option.path)}
                      >
                        Acceder
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default DashboardPage;
