import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin, Bed, Bath, Square, Phone } from "lucide-react";

const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch property details from backend
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
        setProperty(res.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching property:", err);
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  // ✅ Send notification to agent
  const handleSendNotification = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Please login to contact the agent");
        navigate("/Login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/users/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: property.agent,
          message: `${user.name} is interested in your property: ${property.title}`,
        }),
      });

      if (response.ok) {
        alert("✅ Notification sent to agent!");
      } else {
        alert("❌ Failed to send notification");
      }
    } catch (error) {
      console.error("❌ Error sending notification:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading property details...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Property not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-12 lg:px-24">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* ✅ Property Image */}
        <div className="rounded-2xl overflow-hidden shadow-md">
          <img
            src={
              property.image
                ? `http://localhost:5000/uploads/${property.image}`
                : "https://via.placeholder.com/600x400"
            }
            alt={property.title}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* ✅ Property Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {property.title}
          </h1>

          <p className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-5 w-5 mr-2 text-blue-500" />
            {property.location}
          </p>

          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            PKR {property.price}
          </h2>

          <div className="flex flex-wrap gap-4 mb-6">
            <span className="flex items-center gap-2 text-gray-700">
              <Bed className="h-5 w-5 text-gray-500" /> {property.bedrooms || "-"} Beds
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              <Bath className="h-5 w-5 text-gray-500" /> {property.bathrooms || "-"} Baths
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              <Square className="h-5 w-5 text-gray-500" /> {property.area || "-"} sqft
            </span>
          </div>

          <p className="text-gray-700 mb-6">{property.description}</p>

          {/* ✅ Agent Info */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Agent Information
            </h3>
            <div className="flex items-center gap-4">
              <img
                src={
                  property.agentPhoto
                    ? `http://localhost:5000/uploads/${property.agentPhoto}`
                    : "https://via.placeholder.com/100"
                }
                alt={property.agentName || "Agent"}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  {property.agentName || "Unknown Agent"}
                </p>
                <p className="flex items-center text-blue-600">
                  <Phone className="h-4 w-4 mr-1" /> {property.agentContact || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* ✅ Contact Agent Button */}
          <button
            onClick={handleSendNotification}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow"
          >
            Contact Agent
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
