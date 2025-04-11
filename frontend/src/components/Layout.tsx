import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isLandingPage = router.pathname === '/';
  const isAuthPage = router.pathname.startsWith('/auth');
  
  return (
    <>
      <Head>
        <title>Sistema POS</title>
        <meta name="description" content="Sistema POS con Next.js y Spring Boot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Box
        sx={{
          minHeight: 'calc(100vh-64px)',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
        }}
      >
        <Container 
          maxWidth={isLandingPage || isAuthPage ? "md" : "xl"}
          sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isLandingPage ? 'center' : 'flex-start',
            py: 4
          }}
        >
          {children}
        </Container>
      </Box>
    </>
  );
};

export default Layout;
