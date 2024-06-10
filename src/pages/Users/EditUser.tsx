/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function EditUser({ closeEvent }: any) {
  const [role, setRole] = useState("");

  const handleRoleChange = (event: any) => {
    setRole(event.target.value);
  };

  const creatUser = () => {
    // Logique de soumission du formulaire
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Modifier un utilisateur
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
          <Select
            label="Role"
            value={role}
            onChange={handleRoleChange}
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root .MuiOutlinedInput-input:focus": {
                backgroundColor: "#e0b828", // Modifier la couleur de fond au jaune
              },
            }}
          >
            <MenuItem value="Client">Client</MenuItem>
            <MenuItem value="Restaurateur">Restaurateur</MenuItem>
            <MenuItem value="Administrateur">Administrateur</MenuItem>
          </Select>
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
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
