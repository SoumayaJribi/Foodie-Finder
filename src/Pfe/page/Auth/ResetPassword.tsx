import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const resetToken = searchParams.get("token");

  const handlePasswordReset = () => {
    if (!newPassword || !confirmPassword) {
      setError("Veuillez entrer et confirmer votre nouveau mot de passe.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    Axios.post(`${BASE_URL}/auth/reset-password`, {
      resetToken,
      newPassword,
    })
      .then((response) => {
        setMessage("Votre mot de passe a été réinitialisé avec succès.");
        setError("");
        setTimeout(() => navigate("/auth/login"), 3000);
      })
      .catch((error) => {
        setError(
          "Impossible de réinitialiser le mot de passe. Veuillez réessayer."
        );
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
              label="Nouveau mot de passe"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirmer le mot de passe"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Réinitialiser
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ResetPassword;
