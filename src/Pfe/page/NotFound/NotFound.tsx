import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import notf from "../../../assets/notf.jpg";
const BackgroundBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundImage: `url(${notf})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  textAlign: "center",
  color: "black",
  padding: "0 1rem",
});
const AccButton = styled(Button)({
  backgroundColor: "#f5c542", // Couleur de fond personnalisée
  borderRadius: "20px", // Forme du bouton personnalisée
  padding: "10px 20px", // Padding personnalisé
  color: "#fff", // Couleur du texte
  "&:hover": {
    backgroundColor: "#f5d142",
  }, // Couleur de fond au survol
});

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <BackgroundBox>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Oups! Rien de délicieux à trouver ici
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Il semble que vous vous soyez égaré. Ne vous inquiétez pas, nous
          allons vous ramener sur le bon chemin.
        </Typography>
        <AccButton
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
        >
          Retour à l'accueil
        </AccButton>
      </Container>
    </BackgroundBox>
  );
};

export default NotFound;
