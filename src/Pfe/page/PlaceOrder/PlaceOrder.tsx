import { useContext } from "react";
import { StoreContext } from "../Menu/context/StoreContext";
import "./PlaceOrder.css";

const Placeorder = () => {
  const { getTotalCartAmount }: any = useContext(StoreContext);
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Informations de livraison</p>
        <div className="multi-fields">
          <input type="text" placeholder="NOM " />
          <input type="text" placeholder="PRENOM " />
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
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-item-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount("cart")} TND</p>
            </div>
            <hr />
            <div className="cart-item-details">
              <p>Delivery Fee</p>
              <p>4 TND</p>
            </div>
            <hr />
            <div className="cart-item-details">
              <b>Total</b>
              <b> TND</b>
            </div>
          </div>
          <button className="cart-total-button">PROCEED TO Payment</button>
        </div>
      </div>
    </form>
  );
};
export default Placeorder;
