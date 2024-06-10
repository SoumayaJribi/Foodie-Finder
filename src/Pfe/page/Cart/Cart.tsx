/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./Cart.css";
import {
  getStorage,
  getTotalPrice,
  removeItem,
  updateItemQuantity,
} from "../../../helpers/functions";
import cartback from "../../../assets/cartback.jpg";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Box, IconButton } from "@mui/material";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const Navigate = useNavigate();
  const [foodList, setFoodList] = useState(getStorage("cart"));

  return (
    <div
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
      <div className="Cart">
        <div className="cart-section">
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Élément</p>
              <p>Titre</p>
              <p>Prix</p>
              <p>Quantité</p>
              <p>Total</p>
              <p>Supprimer</p>
            </div>
            <hr />
            {foodList?.map((item: any) => (
              <div key={item.id}>
                <div className="cart-items-item">
                  <img
                    src={item?.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <p>{item.name}</p>
                  <p>{item.price} TND</p>
                  <p>{item.count}</p>
                  <p>{item.price * item.count} TND</p>
                  <Box display="flex">
                    <IconButton
                      sx={{
                        p: 2,
                        width: "20px",
                        height: "20px",
                      }}
                      onClick={() => {
                        updateItemQuantity("cart", item.id, item.count + 1);
                        setFoodList(getStorage("cart"));
                      }}
                    >
                      <AddRoundedIcon />
                    </IconButton>
                    <IconButton
                      sx={{
                        p: 2,
                        width: "20px",
                        height: "20px",
                      }}
                      onClick={() => {
                        updateItemQuantity("cart", item.id, item.count - 1);
                        setFoodList(getStorage("cart"));
                      }}
                    >
                      <RemoveRoundedIcon />
                    </IconButton>
                    <IconButton
                      sx={{
                        p: 2,
                        width: "20px",
                        height: "20px",
                      }}
                      onClick={() => {
                        removeItem("cart", item.id);
                        setFoodList(getStorage("cart"));
                      }}
                    >
                      <CancelRoundedIcon />
                    </IconButton>
                  </Box>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>

        <div className="cart-section">
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Totaux du panier</h2>
              <div>
                <div className="cart-item-details">
                  <p>Total</p>
                  <p>{getTotalPrice("cart")} TND</p>
                </div>
                <hr />
                <div className="cart-item-details">
                  <p>Frais de livraison</p>
                  <p>4 TND</p>
                </div>
                <hr />
                <div className="cart-item-details">
                  <b>Total</b>
                  <b> TND </b>
                </div>
              </div>
              <button
                className="cart-total-button"
                onClick={() => Navigate("/checkout")}
              >
                PASSER À LA CAISSE
              </button>
            </div>

            <div className="cart-promocode">
              <div>
                <p>Si vous avez un code promo, saisissez-le ici</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder="promo code" />
                  <button>Soumettre</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
