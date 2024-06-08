import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Axios from "axios";
import { BASE_URL } from "../../../config";

export default function AddRestaurants({ closeEvent }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [email, setEmail] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [image, setImage] = useState(null);
  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };
  const handlePhoneChange = (event: any) => {
    setPhone(event.target.value);
  };
  const handleAdressChange = (event: any) => {
    setAdress(event.target.value);
  };
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const handleOpeningHoursChange = (event: any) => {
    setOpeningHours(event.target.value);
  };
  const handleCuisineTypeChange = (event: any) => {
    setCuisineType(event.target.value);
  };
  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const creatUser = () => {
    const token = localStorage.getItem("token");
    Axios.post(
      `${BASE_URL}/restaurants/register`,
      {
        name: name,
        address: adress,
        email: email,
        openingHours: openingHours,
        cuisineType: cuisineType,
        phoneNumber: phone,
        image: image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: Error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Ajouter des Restaurants
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
            label="Email"
            variant="outlined"
            size="small"
            onChange={handleEmailChange}
            value={email}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Adresse"
            variant="outlined"
            size="small"
            onChange={handleAdressChange}
            value={adress}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Téléphone"
            variant="outlined"
            size="small"
            onChange={handlePhoneChange}
            value={phone}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Type de Cuisine"
            variant="outlined"
            size="small"
            onChange={handleCuisineTypeChange}
            value={cuisineType}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Heure d'ouverture"
            variant="outlined"
            size="small"
            onChange={handleOpeningHoursChange}
            value={openingHours}
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
