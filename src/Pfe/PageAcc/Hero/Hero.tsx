import "./HeroStyle.css";
import Image from "../../../assets/i1.jpg";
import { AiOutlineSearch } from "react-icons/ai";
import Navbar from "../Navbar/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../config";

type props = { setSearchData: any };

function Hero({ setSearchData }: props) {
  const [search, setSearch] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${BASE_URL}/clients/search?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await setSearchData(response.data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (search) handleSearch();
  }, [search]);

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
                onChange={handleChange}
                value={search}
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
