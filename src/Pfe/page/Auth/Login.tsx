import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Grid, Paper } from "@mui/material";
import Axios from "axios";
import backgL from "../../../assets/backgL.jpg";
import { BASE_URL } from "../../../../config";
import { useAuth } from "../../../context/auth";

const transparentPaperStyle = {
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.2)", // Augmentation de l'opacité pour une meilleure lisibilité
};

const buttonStyle = {
  backgroundColor: "#f5c542", // Couleur de fond du bouton
  color: "#000000", // Couleur du texte du bouton
  marginTop: "20px",
};

const linkStyle = {
  color: "#f5c542",
  marginTop: "10px",
  alignItems: "center",
};

const Login = () => {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { fetchUserProfile } = useAuth();

  const loginUser = () => {
    // Validation des données
    if (!loginUserName || !loginPassword) {
      setError(
        "Veuillez entrer à la fois votre nom d'utilisateur et votre mot de passe."
      );
      return;
    }

    Axios.post(`${BASE_URL}/auth/login`, {
      username: loginUserName,
      password: loginPassword,
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.result.token);
        fetchUserProfile();
        navigate("/");
        // Rediriger vers la page de profil ou toute autre page appropriée après la connexion réussie
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError("Invalid username or password. Please try again.");
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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} style={transparentPaperStyle}>
            <Typography variant="h4" gutterBottom textAlign="center">
              Connexion
            </Typography>
            <TextField
              label="Username"
              value={loginUserName}
              onChange={(e) => setLoginUserName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              type="password"
              label="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
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
              style={buttonStyle}
              onClick={loginUser}
              fullWidth
            >
              Se connecter
            </Button>
            <Typography style={{ marginTop: "10px" }}>
              Pas encore de compte?{" "}
              <Link to="/auth/register" style={linkStyle}>
                Inscription
              </Link>
            </Typography>
            <Typography style={{ marginTop: "10px", textAlign: "center" }}>
              <Link to="/auth/forgot-password" style={linkStyle}>
                Mot de passe oublié ?
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
