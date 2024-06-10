/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, ReactNode } from "react";
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

  const contextValue: StoreContextProps = {
    food_list: food_list as any,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
