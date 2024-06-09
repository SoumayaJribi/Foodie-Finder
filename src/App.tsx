import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pfe/PageAcc/Home";
import { UserProvider } from "./Pfe/PageAcc/Oppor/UserContext";
import ForgotPassword from "./Pfe/page/Auth/ForgotPassword";
import Login from "./Pfe/page/Auth/Login";
import Register from "./Pfe/page/Auth/Register";
import ResetPassword from "./Pfe/page/Auth/ResetPassword";
import Cart from "./Pfe/page/Cart/Cart";
import MHome from "./Pfe/page/Menu/MHome/MHome";
import NotFound from "./Pfe/page/NotFound/NotFound";
import PlaceOrder from "./Pfe/page/PlaceOrder/PlaceOrder";
import FoodPreferenceForm from "./Pfe/page/PrefForm/FoodPreferenceForm";
import RestaurantsPage from "./Pfe/page/Restaurant/RestaurantPage";
import { MainLayout } from "./Pfe/page/main";
import HomePage from "./Pfe/page/pagedacc/HomePage";
import { Profile } from "./Pfe/page/profile";
import DaHome from "./pages/DaHome";
import DaMenu from "./pages/DaMenu";
import Demandes from "./pages/Demandes";
import FormConfirmation from "./pages/FormRestau/FormConfirmation";
import RestaurantForm from "./pages/FormRestau/RestaurantForm";
import { Menu } from "./pages/Menu/Menu";
import Orders from "./pages/Orders";
import Restaurants from "./pages/Restaurants";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import { Resto } from "./pages/restaurants/Restaurant";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("auth/login");
  }, []);

  return (
    <UserProvider>
      <Routes>
        <Route path="/auth">
          <Route index element={<></>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset" element={<ResetPassword />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="Prefform" element={<FoodPreferenceForm />} />
          <Route path="PHome" element={<HomePage />} />
          <Route path="Restaurant" element={<RestaurantsPage />} />
          <Route path="restaurants">
            <Route index element={<Restaurants />} />
            <Route path=":id" element={<Resto />} />
          </Route>
          <Route path="restaurants/:id/menus/:idMenu" element={<Menu />} />
          <Route path="categories" element={<Settings />} />
          <Route path="users" element={<Users />} />
          <Route path="demandes" element={<Demandes />} />
          <Route path="commandes" element={<Orders />} />
          <Route path="dahome" element={<DaHome />} />
          <Route path="damenu" element={<DaMenu />} />
          <Route path="profile" element={<Profile />} />
          <Route path="mmenu" element={<MHome />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<PlaceOrder />} />
          <Route path="inscri" element={<RestaurantForm />} />
          <Route path="confirmation" element={<FormConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
