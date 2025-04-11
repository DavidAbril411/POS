import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4fc3f7', // Celeste principal
      light: '#8bf6ff',
      dark: '#0093c4',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#81d4fa', // Celeste secundario más claro
      light: '#b6ffff',
      dark: '#4ba3c7',
      contrastText: '#000000',
    },
    background: {
      default: '#f5f9fc', // Fondo muy clarito
      paper: '#ffffff',
    },
    text: {
      primary: '#37474f',
      secondary: '#546e7a',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 300,
    },
    h2: {
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          boxShadow: '0 3px 5px 2px rgba(79, 195, 247, .2)',
          padding: '10px 20px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 8px 16px rgba(79, 195, 247, 0.15)',
        },
      },
    },
  },
});

export default theme;
