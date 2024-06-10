/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./RestaurantForm.css";
import form from "../../assets/form.jpg";
import axios from "axios";
import { BASE_URL } from "../../../config";

const RestaurantForm = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await axios.post(
        `${BASE_URL}/restaurants/register
`,
        {
          name: data.name,
          address: data.address,
          email: data.email,
          phoneNumber: data.phoneNumber,
          openeingHours: data.openingHours,
          cuisineType: data.cuisineType,
          imageUrl: data.imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log({ error });
    }

    navigate("/confirmation", { state: { formData: data } });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${form})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="form-container">
        <h1 className="form-title">Demande de Partenariat</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-field">
            <label className="label">Nom du Restaurant</label>
            <input
              className="input"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="error-message">Le nom du restaurant est requis</p>
            )}
          </div>
          <div className="form-field">
            <label className="label">Adresse</label>
            <input
              className="input"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <p className="error-message">L'adresse est requise</p>
            )}
          </div>
          <div className="form-field">
            <label className="label">Type de Cuisine</label>
            <input
              className="input"
              {...register("cuisineType", { required: true })}
            />
            {errors.cuisineType && (
              <p className="error-message">Le type de cuisine est requis</p>
            )}
          </div>
          <div className="form-field">
            <label className="label">Horaires d'Ouverture</label>
            <input
              className="input"
              {...register("openingHours", { required: true })}
            />
            {errors.openingHours && (
              <p className="error-message">
                Les horaires d'ouverture sont requis
              </p>
            )}
          </div>
          <div className="form-field">
            <label className="label">Email de Contact</label>
            <input
              type="email"
              className="input"
              {...register("contactEmail", { required: true })}
            />
            {errors.contactEmail && (
              <p className="error-message">L'email de contact est requis</p>
            )}
          </div>
          <div className="form-field">
            <label className="label">Téléphone de Contact</label>
            <input
              className="input"
              {...register("contactPhone", { required: true })}
            />
            {errors.contactPhone && (
              <p className="error-message">Le numéro de téléphone est requis</p>
            )}
          </div>

          <div className="submit-button-container">
            <button type="submit" className="submit-button">
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantForm;
