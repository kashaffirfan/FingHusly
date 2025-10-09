import React from "react";

const PropertyCard = ({ property }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        margin: "10px",
        width: "280px",
        backgroundColor: "#fafafa",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ color: "#333", marginBottom: "8px" }}>{property.title}</h3>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Price:</strong> Rs {property.price.toLocaleString()}</p>
      <p><strong>Type:</strong> {property.type}</p>
    </div>
  );
};

export default PropertyCard;
