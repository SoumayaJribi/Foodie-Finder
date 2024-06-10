/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../../config";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";

type menuItemType = {
  id: number;
  name: string;
  description: string;
  price: number;
  restaurantId: number;
  menu_id: number;
  imageUrl: string;
  categoryId: number;
};

const FoodDisplay = ({ category }: any) => {
  const [itemMenuList, setItemMenuList] = useState<menuItemType[]>([]);
  const fetchItemsMenu = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${BASE_URL}/restaurants/menuItem`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItemMenuList(response.data);
    } catch (error) {
      console.log("error while fetching itemsMenu", error);
    }
  };

  useEffect(() => {
    fetchItemsMenu();
  }, []);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {itemMenuList.map((item: any, index: number) => {
          if (category == "All" || category === item.category)
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
        })}
      </div>
    </div>
  );
};
export default FoodDisplay;
