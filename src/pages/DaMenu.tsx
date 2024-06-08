import Sidenav from "../Pfe/page/Dashboard/components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../Pfe/PageAcc/Navbar/Navbar";
import MenuList from "./Menu/MenuList";
import { useAuth } from "../context/auth";

export default function DaMenu() {
  const { user } = useAuth();
  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <MenuList />
          </Box>
        </Box>
      </div>
    </>
  );
}
