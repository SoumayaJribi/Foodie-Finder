import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Row } from "../../../components/Box";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import { BASE_URL } from "../../../../config";

const buttonStyle = {
  backgroundColor: "#f5c542",
  color: "#000000",
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    Name: "",
    email: "",
  });
  const [changePassword, setChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleChangePassword = () => {
    setChangePassword(!changePassword);
  };

  const handleOldPasswordChange = (e: any) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: any) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmitPasswordChange = async () => {
    if (newPassword && confirmPassword && oldPassword) {
      try {
        const response = await axios.patch(
          `${BASE_URL}/users/change-password`,
          {
            currentPassword: oldPassword,
            newPassword: newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log({ response });
      } catch (error) {
        console.log({ error });
      }
    }
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setChangePassword(false);
  };

  const handleChangeNameEmail = async () => {
    if (profile.Name && profile.email) {
      try {
        const response = await axios.patch(
          `${BASE_URL}/users/updateProfil`,
          {
            username: profile.Name,
            email: profile.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log({ response });
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const toggleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 2 }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Mon Profil</Typography>
          <Button
            variant="contained"
            style={buttonStyle}
            onClick={() => {
              setIsEditing(!isEditing);
              handleChangeNameEmail();
            }}
          >
            {isEditing ? "Enregistrer" : "Modifier"}
          </Button>
        </Box>

        <Box
          gap={3}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Row>
            <Paper sx={{ p: 1, borderRadius: "15px" }}>
              <img
                src="/src/assets/profile.jpg"
                alt="test"
                style={{ borderRadius: "15px", maxWidth: "250px" }}
              />
            </Paper>
          </Row>

          {isEditing ? (
            <>
              <TextField
                label="Nom"
                variant="outlined"
                name="Name"
                defaultValue={user?.username}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                defaultValue={user?.email}
                onChange={handleInputChange}
                fullWidth
              />
            </>
          ) : (
            <>
              <Typography>Nom : {user?.username}</Typography>
              <Typography>Email: {user?.email}</Typography>
            </>
          )}

          <Button
            variant="contained"
            style={buttonStyle}
            onClick={handleChangePassword}
          >
            Changer de mot de passe
          </Button>
        </Box>
      </Paper>

      {changePassword && (
        <Paper sx={{ p: 2, marginTop: 2 }}>
          <Typography variant="h6" gutterBottom>
            Changer mot de passe
          </Typography>
          <TextField
            label="Ancien mot de passe"
            variant="outlined"
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={handleOldPasswordChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowOldPassword}>
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Nouveau mot de passe"
            variant="outlined"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={handleNewPasswordChange}
            fullWidth
            style={{ marginTop: "10px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowNewPassword}>
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirmer le nouveau mot de passe"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
            style={{ marginTop: "10px" }}
          />
          <Button
            variant="contained"
            style={{ ...buttonStyle, marginTop: "10px" }}
            onClick={handleSubmitPasswordChange}
          >
            Enregistrer
          </Button>
        </Paper>
      )}

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Mon historique de commandes
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Commande</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Prix total</TableCell>
                <TableCell>Statut</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user?.orders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
export default Profile;
