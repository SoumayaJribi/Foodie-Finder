import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Typography, Grid, Paper } from "@mui/material";
import Axios from "axios";
import backgL from "../../../assets/backgL.jpg";
import { BASE_URL } from "../../../../config";

const transparentPaperStyle = {
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
};

const buttonStyle = {
  backgroundColor: "#f5c542",
  color: "#000000",
  marginTop: "20px",
};

const linkStyle = {
  color: "#f5c542",
  marginTop: "10px",
  alignItems: "center",
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = () => {
    if (!email) {
      setError("Veuillez entrer votre adresse e-mail.");
      return;
    }

    Axios.post(`${BASE_URL}/auth/forget-password`, { email })
      .then(() => {
        setMessage(
          "Un lien de réinitialisation a été envoyé à votre adresse e-mail."
        );
        setError("");
      })
      .catch((error) => {
        setError(error.message);
        setMessage("");
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
              Réinitialiser le mot de passe
            </Typography>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            {message && (
              <Typography variant="body2" color="primary">
                {message}
              </Typography>
            )}
            <Button
              variant="contained"
              style={buttonStyle}
              onClick={handlePasswordReset}
              fullWidth
            >
              Envoyer
            </Button>
            <Typography style={{ marginTop: "10px", textAlign: "center" }}>
              <Link to="/auth/login" style={linkStyle}>
                Retour à la connexion
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ForgotPassword;
