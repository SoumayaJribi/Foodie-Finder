import { useAuth } from "../../context/auth";
import Footer from "./Footer/Footer";
import Hero from "./Hero/Hero";
import Oppor from "./Oppor/Oppor";
import Order from "./Order/Order";

function Home() {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <Hero />
      <Order />
      <Oppor />
      <Footer />
    </>
  );
}

export default Home;
