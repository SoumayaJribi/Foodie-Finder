import { useState } from "react";
import { useAuth } from "../../context/auth";
import Footer from "./Footer/Footer";
import Hero from "./Hero/Hero";
import Oppor from "./Oppor/Oppor";
import Order from "./Order/Order";
import DataSearch from "./DataSearch/DataSearch";

function Home() {
  const { user } = useAuth();
  const [searchData, setSearchData] = useState({
    restaurants: [],
    menus: [],
    menuItems: [],
  });

  console.log(user);
  return (
    <>
      <Hero setSearchData={setSearchData} />
      {searchData.restaurants.length > 0 && (
        <DataSearch data={searchData.restaurants} />
      )}
      <Order />
      <Oppor />
      <Footer />
    </>
  );
}

export default Home;
