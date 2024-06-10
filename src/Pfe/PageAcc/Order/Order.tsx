import "./OrderStyle.css";
import image2 from "../../../assets/i2.jpg";
import image3 from "../../../assets/i3.jpg";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/mmenu");
  };

  return (
    <div className="order">
      <h1>Commandez votre plat préféré ici</h1>
      <div className="first-des">
        <div className="des-text">
          <p className="p">
            Choisissez parmi un menu varié comprenant une gamme raffinée de
            plats préparés avec les meilleurs ingrédients et culinaires. Notre
            mission est de satisfaire vos envies et d'améliorer votre expérience
            culinaire, un délicieux repas à la fois.
          </p>
          <button className="menu-button" onClick={handleMenuClick}>
            Menu
          </button>
        </div>
        <div className="image">
          <img alt="img" src={image2} />
          <img alt="img" src={image3} />
        </div>
      </div>
    </div>
  );
};

export default Order;
