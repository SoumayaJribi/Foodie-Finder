import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OpporStyle.css";

interface OpporDataProps {
  image: string;
  heading: string;
  text: string;
  buttonText: string;
  link: string; // Ajoutez cette ligne
}

const OpporData: React.FC<OpporDataProps> = ({
  image,
  heading,
  text,
  buttonText,
  link,
}) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const role = localStorage.getItem("role");

  const handleClick = () => {
    if (role === "Restaurateur" || role === "Admin") {
      navigate(link);
    } else {
      setMessage("You dont have permission to visit this route!");
    }
  };

  return (
    <div className="t-card">
      <div className="t-image">
        <img alt="image" src={image} />
      </div>
      <h4>{heading}</h4>
      <p>{text}</p>
      <button className="action-button" onClick={handleClick}>
        {buttonText}
      </button>

      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
};

export default OpporData;
