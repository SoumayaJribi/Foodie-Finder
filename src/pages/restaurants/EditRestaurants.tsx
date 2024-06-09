import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Axios from "axios";
import { BASE_URL } from "../../../config";

export default function EditRestaurants({ closeEvent }: any) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [status, setStatus] = useState(""); // État pour le statut sélectionné
  const [image, setImage] = useState(null);

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };
  const handlePhoneChange = (event: any) => {
    setPhone(event.target.value);
  };
  const handleAddressChange = (event: any) => {
    setAddress(event.target.value);
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
  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };
  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const handleAddRestaurant = () => {
    const token = localStorage.getItem("token");
    Axios.post(
      `${BASE_URL}/restaurants/register`,
      {
        name: name,
        address: address,
        email: email,
        openingHours: openingHours,
        cuisineType: cuisineType,
        phoneNumber: phone,
        status: status, // Utilisation du statut sélectionné dans la requête
        image: image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Création de restaurant échouée:", error);
      });
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
            label="Statut"
            variant="outlined"
            size="small"
            select // Transformez-le en liste déroulante
            onChange={handleStatusChange}
            value={status}
            sx={{ minWidth: "100%" }}
          >
            <MenuItem value="Accepté">Accepté</MenuItem>
            <MenuItem value="Rejeté">Rejeté</MenuItem>
            <MenuItem value="Bloqué">Bloqué</MenuItem>
          </TextField>
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
            onChange={handleAddressChange}
            value={address}
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
            label="Cuisine"
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
            accept="image"
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
              onClick={handleAddRestaurant}
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
