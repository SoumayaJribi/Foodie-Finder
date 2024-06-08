import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem"; // Importez MenuItem

export default function EditDemande({ closeEvent }) {
  const [statut, setStatut] = useState("");

  const handleStatutChange = (event) => {
    setStatut(event.target.value);
  };

  const handleSubmit = () => {
    // Logique de soumission ici
    console.log("Statut sélectionné:", statut);
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Modifier Restaurants
      </Typography>
      <IconButton
        style={{ position: "absolute", top: 0, right: 0 }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Statut"
            variant="outlined"
            size="small"
            select // Transformez-le en liste déroulante
            onChange={handleStatutChange}
            value={statut}
            sx={{ minWidth: "100%" }}
          >
            <MenuItem value="Accepté">Accepté</MenuItem>
            <MenuItem value="Rejeté">Rejeté</MenuItem>
            <MenuItem value="Bloqué">Bloqué</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#e0b828",
                  color: "#000000",
                },
              }}
            >
              Soumettre
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
