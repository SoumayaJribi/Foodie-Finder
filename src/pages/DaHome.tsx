import Sidenav from "../Pfe/page/Dashboard/components/Sidenav";
import Navbar from "../Pfe/PageAcc/Navbar/Navbar";
//import AccordionDash from "../Pfe/page/Dashboard/components/AccordionDash";
import Box from "@mui/material/Box";
//import Grid from "@mui/material/Grid";
//import Card from "@mui/material/Card";
//import CardContent from "@mui/material/CardContent";
//import Typography from "@mui/material/Typography";
//import Stack from "@mui/material/Stack";
import "../Dash.css";
//import StorefrontIcon from "@mui/icons-material/Storefront";
//import CreditCardIcon from "@mui/icons-material/CreditCard";
//import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
//import Barchart from "../charts/Barchart";
import Index from "../Pfe/page/profile/Index";

export default function DaHome() {
  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {/* <Index /> */}
          </Box>
        </Box>
      </div>
    </>
  );
}
