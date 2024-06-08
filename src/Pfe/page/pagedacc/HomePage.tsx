import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Logo = styled('img')({
  width: '150px',
  marginBottom: '20px',
});

const StyledButton = styled(Button)({
  color: '#fff',
  backgroundColor: '#f5c542',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: '#f5d142',
  },
});

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartOrder = () => {
    navigate('/restaurants');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <Logo src="./src/assets/logo.png" alt="Logo" />
      <Typography variant="h3" component="h1" gutterBottom style={{color:'black'}}>
        Bienvenue sur FoodieFinder 
      </Typography>
      <Typography variant="body1" paragraph style={{color:'black'}}>
        Commandez vos repas préférés en quelques clics et profitez d'une livraison rapide.
      </Typography>
      <StyledButton variant="contained" onClick={handleStartOrder}>
        Commencer la commande
      </StyledButton>
    </div>
  );
};

export default HomePage;
