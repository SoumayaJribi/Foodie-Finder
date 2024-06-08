import { useState } from "react";
import "./NavbarStyle.css";
import { MenuItems } from "../MenuItems";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useAuth } from "../../../context/auth";

const Navbar = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    signout();
    setOpen(false);
  };

  return (
    <nav className="navbarItems">
      <h1 className="navbar-logo" onClick={() => navigate("/")}>
        FoodieFinder
      </h1>
      <ul className="nav-menu">
        {MenuItems.map((item, index) => (
          <li key={index}>
            <a className={item.cName} href={item.url}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      <div className="navbar-right">
        {user && (
          <div className="welcome-message">Bienvenue, {user.username}</div>
        )}
        <div className="buttons">
          <div>
            <Button
              variant="contained"
              onClick={() => navigate(user ? "/profile" : "/auth/login")}
              className="button1"
              sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#e0b828",
                  color: "#000000",
                },
              }}
            >
              {user ? "Profil" : "Se Connecter"}
            </Button>
          </div>

          <div>
            <Button
              variant="contained"
              onClick={() => navigate("/mmenu")}
              className="button2"
              sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#e0b828",
                  color: "#000000",
                },
              }}
            >
              Menu
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => navigate("/cart")}
              className="button2"
              sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#e0b828",
                  color: "#000000",
                },
              }}
            >
              <ShoppingCartIcon />
            </Button>
          </div>
          {user && (
            <div>
              <Button
                variant="contained"
                onClick={handleLogoutClick}
                className="button2"
                sx={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#e0b828",
                    color: "#000000",
                  },
                }}
              >
                <LogoutIcon />
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Confirmer la déconnexion"}
                </DialogTitle>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#e0b828",
                        color: "#000000",
                      },
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="contained"
                    color="primary"
                    autoFocus
                    sx={{
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#e0b828",
                        color: "#000000",
                      },
                    }}
                  >
                    Déconnexion
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
