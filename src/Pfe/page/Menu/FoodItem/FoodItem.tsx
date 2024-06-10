import React, { useContext, useState } from "react";
import "./FoodItem.css";

import { StoreContext, StoreContextProps } from "../context/StoreContext";
import { assets } from "../../../../assets/assets";
import { Box, IconButton, Typography } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { saveOrUpdateStorage } from "../../../../helpers/functions";
// Définir le type pour les props
interface FoodItemProps {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const FoodItem: React.FC<FoodItemProps> = ({
  id,
  name,
  price,
  description,
  image,
}) => {
  const context = useContext<StoreContextProps | null>(StoreContext);
  const [count, setCount] = useState(0);
  // Vérifiez que le contexte n'est pas null

  if (!context) {
    return <div>Loading...</div>;
  }

  const onAdd = () => {
    setCount((prev) => prev + 1);
  };

  const onRemove = () => {
    setCount((prev) => {
      if (prev > 0) return prev - 1;
      else return prev;
    });
  };

  const onSubmit = () => {
    saveOrUpdateStorage("cart", {
      count,
      name,
      price: +price,
      id: id.toString(),
    });
    setCount(0);
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={image}
          alt={name}
          style={{ objectFit: "cover", height: "200px" }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "15px",
            right: "15px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            paddingX: "5px",
            paddingY: "1px",
            borderRadius: "50px",
            backgroundColor: "white",
          }}
        >
          <IconButton
            sx={(theme) => ({
              p: 0,
              width: 25,
              height: 25,
              fontFamily: "monospace",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: `${theme.palette.success.light}`,
              background: `${theme.palette.success.light}5f`,
            })}
            onClick={onAdd}
          >
            +
          </IconButton>
          <Typography fontFamily="initial">{count}</Typography>
          <IconButton
            sx={(theme) => ({
              p: 0,
              width: 25,
              height: 25,
              fontFamily: "monospace",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: `${theme.palette.error.light}`,
              background: `${theme.palette.error.light}5f`,
            })}
            onClick={onRemove}
          >
            -
          </IconButton>
          <IconButton
            onClick={onSubmit}
            sx={(theme) => ({
              width: 25,
              height: 25,
              padding: 2,
              fontFamily: "monospace",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                color: `${theme.palette.primary.main}`,
              },
            })}
          >
            <ShoppingCartRoundedIcon
              sx={{
                fontSize: "20px",
              }}
            />
          </IconButton>
        </Box>
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">{price} TND</p>
      </div>
    </div>
  );
};

export default FoodItem;
