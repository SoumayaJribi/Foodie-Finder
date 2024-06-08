import React from "react";
import "./OpporStyle.css";
import image4 from "../../../assets/i4.jpg";
import image5 from "../../../assets/i5.jpg";
import OpporData from "./OpporData";

const Oppor: React.FC = () => {
  return (
    <div className="oppor">
      <h1>Espace Opportunités et Tableau de Bord</h1>
      <div className="t-card-container">
        <OpporData
          image={image4}
          heading="Devenir partenaire"
          text="Découvrez Foodie Finder ! Augmentez vos ventes et explorez de nouvelles opportunités grâce à notre technologie de pointe et notre large base d'utilisateurs passionnés de gastronomie !"
          buttonText="Inscription"
          link="/inscri"
        />
        <OpporData
          image={image5}
          heading="Dashboard"
          text="Utilisez notre tableau de bord pour suivre vos ventes, gérer vos menus et atteindre une large communauté de passionnés de cuisine."
          buttonText="Dashboard"
          link="/dahome"
        />
      </div>
    </div>
  );
};

export default Oppor;
