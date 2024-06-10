import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }: any) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("auth/login");
  }, []);

  return <>{children}</>;
};

export default AuthGuard;
