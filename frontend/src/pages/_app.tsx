import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import theme from "@/styles/theme";
import NavBar from "@/components/layout/NavBar";
import { Box } from "@mui/material";
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <NavBar />
          <Layout>
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Component {...pageProps} />
          </Box>
          </Layout>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
