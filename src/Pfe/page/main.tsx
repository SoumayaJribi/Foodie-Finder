import { Outlet } from "react-router-dom";
import Navbar from "../PageAcc/Navbar/Navbar";
import { Box } from "@mui/material";

export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ p: 0, mt: 15 }}>
        <Outlet />
      </Box>
    </>
  );
};
