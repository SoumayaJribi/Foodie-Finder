/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function AddBoisson({ closeEvent }: any) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  console.log(image);
  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };
  const handlePriceChange = (event: any) => {
    setPrice(event.target.value);
  };
  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };
  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const creatUser = () => {
    // Logique pour envoyer les données du nouveau restaurant avec l'image à l'API
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Ajouter des éléments
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Nom"
            variant="outlined"
            size="small"
            onChange={handleNameChange}
            value={name}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Prix"
            variant="outlined"
            size="small"
            onChange={handlePriceChange}
            value={price}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            size="small"
            onChange={handleDescriptionChange}
            value={description}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Image:</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="upload-image"
          />
          <label htmlFor="upload-image">
            <Button
              variant="outlined"
              component="span"
              style={{
                color: "#000",
                borderColor: "black",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Parcourir
            </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button
              variant="contained"
              onClick={creatUser}
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
