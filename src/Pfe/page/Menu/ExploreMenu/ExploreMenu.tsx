import { useState } from "react";
import { menu_list, restaurant_list } from "../../../../assets/assets";
import "./ExploreMenu.css";
import FoodDisplay from "../FoodDisplay/FoodDisplay";

interface ExploreMenuProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ExploreMenu: React.FC<ExploreMenuProps> = ({ category, setCategory }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(
    null
  );

  const handleRestaurantClick = (restaurantName: string) => {
    if (selectedRestaurant === restaurantName) {
      setSelectedRestaurant(null);
    } else {
      setSelectedRestaurant(restaurantName);
    }
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our restaurants</h1>
      <div className="explore-menu-list">
        {/* Affichage des restaurants */}
        {restaurant_list.map((restaurant, index) => (
          <div
            onClick={() => handleRestaurantClick(restaurant.restaurant_name)}
            key={index}
            className="explore-menu-list-item"
          >
            <img
              className={
                selectedRestaurant === restaurant.restaurant_name
                  ? "active"
                  : ""
              }
              src={restaurant.restaurant_image}
              alt={restaurant.restaurant_name}
            />
            <p>{restaurant.restaurant_name}</p>
          </div>
        ))}
      </div>
      <hr />
      {/* Affichage de la liste des menus et des plats associés */}
      {selectedRestaurant && (
        <div className="menu-and-food-list">
          {/* Liste des menus */}
          <div className="explore-menu-list">
            {menu_list.map((item, index) => (
              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.menu_name ? "All" : item.menu_name
                  )
                }
                key={index}
                className="explore-menu-list-item"
              >
                <img
                  className={category === item.menu_name ? "active" : ""}
                  src={item.menu_image}
                  alt={item.menu_name}
                />
                <p>{item.menu_name}</p>
              </div>
            ))}
          </div>
          {/* Liste des plats */}
          {selectedRestaurant && (
            <>
              <FoodDisplay category={category} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ExploreMenu;
