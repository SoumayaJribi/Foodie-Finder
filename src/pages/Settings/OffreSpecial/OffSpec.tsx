import Navbar from "../../../Pfe/PageAcc/Navbar/Navbar";
import Sidenav from "../../../Pfe/page/Dashboard/components/Sidenav";

import Box from "@mui/material/Box";

export default function Profile() {
  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>About</h1>
        </Box>
      </Box>
    </>
  );
}
