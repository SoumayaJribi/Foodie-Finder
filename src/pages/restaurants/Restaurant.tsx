import MenuList from "../Menu/MenuList";
import { Box } from "@mui/material";
import listemenu from "../../assets/listemenu.jpg";

export const Resto = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${listemenu})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "1000px", // Vous pouvez ajuster cette valeur selon vos besoins
          margin: "0 auto", // Centre horizontalement
          padding: "20px", // Pour ajouter un peu d'espace intérieur
          backgroundColor: "rgba(255, 255, 255, 0.6)", // Pour un fond blanc avec 80% d'opacité
          borderRadius: "8px", // Pour arrondir les coins
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Pour ajouter une ombre légère
        }}
      >
        <MenuList />
      </Box>
    </div>
  );
};
