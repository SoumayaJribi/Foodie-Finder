import React from "react";
import { useLocation } from "react-router-dom";
import confirm from "../../assets/confirm.jpg"; // Chemin vers votre image de fond

const FormConfirmation: React.FC = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "column" as "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: `url(${confirm})`,
      backgroundSize: "cover",
      backgroundPosition: "center",

      padding: "20px",
    },
    title: {
      fontSize: "2em",
      marginBottom: "20px",
      color: "#ffffff",
    },
    formData: {
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
    },
    formDataTitle: {
      marginBottom: "15px",
    },
    formDataItem: {
      margin: "5px 0",
    },
    formDataLabel: {
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Formulaire envoyé avec succès !</h1>
      <p style={{ color: "#ffffff" }}>
        Merci pour votre demande de partenariat. Nous allons examiner vos
        informations et vous répondre bientôt.
      </p>
      {formData && (
        <div style={styles.formData}>
          <h2 style={styles.formDataTitle}>Informations du formulaire</h2>
          <p style={styles.formDataItem}>
            <span style={styles.formDataLabel}>Nom du Restaurant:</span>{" "}
            {formData.name}
          </p>
          <p style={styles.formDataItem}>
            <span style={styles.formDataLabel}>Adresse:</span>{" "}
            {formData.address}
          </p>
          <p style={styles.formDataItem}>
            <span style={styles.formDataLabel}>Type de Cuisine:</span>{" "}
            {formData.cuisineType}
          </p>
          <p style={styles.formDataItem}>
            <span style={styles.formDataLabel}>Horaires d'Ouverture:</span>{" "}
            {formData.openingHours}
          </p>
          <p style={styles.formDataItem}>
            <span style={styles.formDataLabel}>Email de Contact:</span>{" "}
            {formData.contactEmail}
          </p>
          <p style={styles.formDataItem}>
            <span style={styles.formDataLabel}>Téléphone de Contact:</span>{" "}
            {formData.contactPhone}
          </p>
        </div>
      )}
    </div>
  );
};

export default FormConfirmation;
