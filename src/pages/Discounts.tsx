import Sidenav from "../Pfe/page/Dashboard/components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../Pfe/PageAcc/Navbar/Navbar";
import DiscountList from "./discounts/DiscountsList";

export default function Discounts() {
  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DiscountList />
          </Box>
        </Box>
      </div>
    </>
  );
}
