import React, { createContext, useEffect, useState, ReactNode } from "react";
import { food_list } from "../../../../assets/assets"; // Ensure this path is correct

// Define the type for the items in the cart
interface CartItems {
  [key: number]: number;
}

// Define the type for the food items
type FoodItem = {
  _id: number;
  name: string;
  price: number;
  image: string;
};

// Define the type for the context
export interface StoreContextProps {
  food_list: FoodItem[];
  cartItems: CartItems;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
  addToCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
}

// Initialize the context with default values
export const StoreContext = createContext<StoreContextProps | null>(null);

// Define the type for the provider props
interface StoreContextProviderProps {
  children: ReactNode;
}

const StoreContextProvider: React.FC<StoreContextProviderProps> = (props) => {
  const [cartItems, setCartItems] = useState<CartItems>({});

  const addToCart = (itemId: number) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (newCartItems[itemId] > 1) {
        newCartItems[itemId] -= 1;
      } else {
        delete newCartItems[itemId];
      }
      return newCartItems;
    });
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue: StoreContextProps = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
