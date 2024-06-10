// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import "./ResMenu.css";

// const RestaurantMenu = ({ menuList }) => {
//   const [category, setCategory] = useState("All");

//   // Filtrer les menus par catégorie
//   const filteredMenu =
//     category === "All"
//       ? menuList
//       : menuList.filter((item) => item.menu_name === category);

//   return (
//     <div className="menu-and-food-list">
//       <h1>Menu du Restaurant</h1>

//       <div className="explore-menu-list">
//         {menuList.map((item, index) => (
//           <div
//             onClick={() =>
//               setCategory((prev) =>
//                 prev === item.menu_name ? "All" : item.menu_name
//               )
//             }
//             key={index}
//             className="explore-menu-list-item"
//           >
//             <img
//               className={category === item.menu_name ? "active" : ""}
//               src={item.menu_image}
//               alt={item.menu_name}
//             />
//             <p>{item.menu_name}</p>
//           </div>
//         ))}
//       </div>

//       <div className="food-display">
//         {filteredMenu.map((item, index) => (
//           <div key={index} className="food-item">
//             <img src={item.food_image} alt={item.food_name} />
//             <p>{item.food_name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RestaurantMenu;
