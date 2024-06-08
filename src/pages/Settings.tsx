import Sidenav from "../Pfe/page/Dashboard/components/Sidenav";
import Navbar from "../Pfe/PageAcc/Navbar/Navbar";
import Box from "@mui/material/Box";
import List from "./Settings/List";

export default function Settings() {
  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <List />
          </Box>
        </Box>
      </div>
    </>
  );
}
