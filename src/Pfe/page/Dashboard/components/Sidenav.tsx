import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
//import IconButton from "@mui/material/IconButton";
//import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
//import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GroupIcon from "@mui/icons-material/Group";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../../AppStore";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidenav() {
  const theme = useTheme();
  const navigate = useNavigate();
  const open = useAppStore((state) => state.dopen);
  const updateOpen = useAppStore((state) => state.updateOpen);

  const handleDrawerToggle = () => {
    updateOpen(!open);
  };

  const role = localStorage.getItem("role");

  return (
    <Box sx={{ display: "flex" }}>
      <Box height={30} />
      <Drawer variant="permanent" open={open}>
        {/*<DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
          </DrawerHeader>*/}
        <Divider />
        <List style={{ marginTop: "100px" }}>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate("/")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Accueil" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          {role === "Admin" && (
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/users")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Utilisateurs"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          )}
          {role === "Admin" && (
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/demandes")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Demandes"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          )}

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate("/restaurants")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText
                primary="Restaurants"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate("/damenu")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Menu" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem> */}

          {/* <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate("/commandes")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText
                primary="Commandes"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem> */}

          {/* <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate("/categories")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FastfoodIcon />
              </ListItemIcon>
              <ListItemText
                primary="Catégories"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem> */}
        </List>
      </Drawer>
    </Box>
  );
}
