import { useState } from "react";
import { useAuth } from "../../context/auth";
import Footer from "./Footer/Footer";
import Hero from "./Hero/Hero";
import Oppor from "./Oppor/Oppor";
import Order from "./Order/Order";
import DataSearch from "./DataSearch/DataSearch";

function Home() {
  const { user } = useAuth();
  const [searchData, setSearchData] = useState([]);
  console.log(searchData);
  console.log(user);
  return (
    <>
      <Hero setSearchData={setSearchData} />
      {searchData.length > 0 && <DataSearch data={searchData} />}
      <Order />
      <Oppor />
      <Footer />
    </>
  );
}

export default Home;
