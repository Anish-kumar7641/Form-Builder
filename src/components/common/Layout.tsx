import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Create Form', path: '/create' },
    { label: 'Preview Form', path: '/preview' },
    { label: 'My Forms', path: '/myforms' },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Form Builder
          </Typography>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color={location.pathname === item.path ? 'secondary' : 'inherit'}
              onClick={() => navigate(item.path)}
              sx={{ ml: 1 }}
            >
              {item.label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
