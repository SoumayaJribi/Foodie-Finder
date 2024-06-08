import "./HeroStyle.css";
import Image from "../../../assets/i1.jpg";
import { AiOutlineSearch } from "react-icons/ai";
import Navbar from "../Navbar/Navbar";

function Hero() {
  return (
    <>
      <Navbar />
      <div className="hero">
        <img alt="HeroImg" src={Image} />
        <div className="hero-text">
          <h1>Trouvez et savourez votre repas parfait</h1>
          <p>Choisissez votre plat préféré.</p>
          <form className="form-container">
            <div className="input-container">
              <input
                type="search"
                placeholder="TypeHere"
                className="search-input"
              />
              <button>
                <AiOutlineSearch />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Hero;
