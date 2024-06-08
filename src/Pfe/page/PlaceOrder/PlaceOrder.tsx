import { useContext } from "react";
import { StoreContext } from "../Menu/context/StoreContext";
import "./PlaceOrder.css";
import cartback from "../../../assets/cartback.jpg";

const PlaceOrder = () => {
  const { getTotalCartAmount }: any = useContext(StoreContext);
  return (
    <form
      className="place-order"
      style={{
        backgroundImage: `url(${cartback})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="place-order-left box">
        <p className="title">Informations de livraison</p>
        <div className="multi-fields">
          <input type="text" placeholder="NOM D'UTILISATEUR" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="ADRESSE" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="PROVINCE" />
          <input type="text" placeholder="VILLE" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="PHONE" />
        </div>
      </div>
      <div className="place-order-right box">
        <div className="cart-total">
          <h2>Totaux du panier</h2>
          <div>
            <div className="cart-item-details">
              <p>Total</p>
              <p>{getTotalCartAmount("cart")} TND</p>
            </div>
            <hr />
            <div className="cart-item-details">
              <p>Frais de Livraison</p>
              <p>4 TND</p>
            </div>
            <hr />
            <div className="cart-item-details">
              <b>Total</b>
              <b> TND</b>
            </div>
          </div>
          <button className="cart-total-button">PAIMENT</button>
        </div>
      </div>
    </form>
  );
};
export default PlaceOrder;
