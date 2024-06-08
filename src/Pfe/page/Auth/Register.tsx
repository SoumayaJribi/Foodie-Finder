import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Grid, Paper } from "@mui/material";
import Axios from "axios";
import backgL from "../../../assets/backgL.jpg";
import { useAuth } from "../../../context/auth";
import { BASE_URL } from "../../../../config";
const transparentPaperStyle = {
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.1)", // Utilisez une couleur de fond avec une opacité (ici, 70% de blanc)
};
const buttonStyle = {
  backgroundColor: "#f5c542", // Couleur de fond du bouton
  color: "#000000",
  marginTop: "20px",
};

const linkStyle = {
  color: "#f5c542",
  marginTop: "10px",
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [registerUserName, setRegisterUserName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { fetchUserProfile } = useAuth();

  const createUser = () => {
    // Validation des données
    if (!email || !registerUserName || !registerPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    Axios.post(`${BASE_URL}/auth/register`, {
      email: email,
      username: registerUserName,
      password: registerPassword,
    })
      .then((response) => {
        console.log("User has been created");
        localStorage.setItem("token", response.data.result.token);
        fetchUserProfile();
        navigate("/");
        // Rediriger vers la page de connexion après l'inscription réussie
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        setError("Registration failed. Please try again.");
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper
            elevation={3}
            style={{ ...transparentPaperStyle, padding: "20px" }}
          >
            <Typography variant="h4" gutterBottom textAlign="center">
              Inscription
            </Typography>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Username"
              value={registerUserName}
              onChange={(e) => setRegisterUserName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              type="password"
              label="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={createUser}
              fullWidth
              style={buttonStyle}
            >
              S'inscrire
            </Button>
            <Typography style={{ marginTop: "10px" }}>
              Déja un compte ?
              <Link to="/auth/login" style={linkStyle}>
                Connexion
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default Register;
