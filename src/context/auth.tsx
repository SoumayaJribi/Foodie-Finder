import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  role_id: number;
  referralCode: string | null;
  imageUrl: string | null;
  role: {
    id: number;
    name: string;
    code: string;
    weight: number;
  };
  restaurants: {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    openingHours: string;
    cuisineType: string;
    imageUrl: string | null;
    status: string;
    ownerId: number;
  }[];
  orders: {
    id: number;
    userId: number;
    totalPrice: number;
    deliveryAddress: string;
    deliveryInstructions: string;
    discountCode: string | null;
    customerNotes: string;
    deliveryMethod: string;
    paymentStatus: string;
    paymentMethod: string;
    estimatedDeliveryDate: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signin: (token: string) => void;
  signout: () => void;
  fetchUserProfile: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  if (user?.role?.name) localStorage.setItem("role", user?.role?.name);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get<User>(`${BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setLoading(false);
    }
  };

  const signin = (token: string) => {
    localStorage.setItem("token", token);
    fetchUserProfile();
  };

  const signout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signin, fetchUserProfile, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
