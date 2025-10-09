import React from "react";
import { useParams } from "react-router-dom";
import { MapPin, Bed, Bath, Square, Phone } from "lucide-react";

const ViewDetails = () => {
  const { id } = useParams();

  // Temporary static property data
  const property = {
    id,
    title: "Luxury Family Villa",
    location: "Bahria Town, Lahore",
    price: "PKR 2.5 Crore",
    bedrooms: 5,
    bathrooms: 4,
    area: "10 Marla",
    description:
      "This luxurious villa offers modern architecture, spacious rooms, and a peaceful environment in the heart of Bahria Town. Ideal for families seeking comfort and style.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    agent: {
      name: "Ali Khan",
      phone: "+92 300 1234567",
      image:
        "https://images.unsplash.com/photo-1603415526960-f7e0328d2b86?auto=format&fit=crop&w=400&q=80",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-12 lg:px-24">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-md">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Property Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {property.title}
          </h1>
          <p className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-5 w-5 mr-2 text-blue-500" />
            {property.location}
          </p>
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            {property.price}
          </h2>

          <div className="flex flex-wrap gap-4 mb-6">
            <span className="flex items-center gap-2 text-gray-700">
              <Bed className="h-5 w-5 text-gray-500" /> {property.bedrooms} Beds
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              <Bath className="h-5 w-5 text-gray-500" /> {property.bathrooms} Baths
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              <Square className="h-5 w-5 text-gray-500" /> {property.area}
            </span>
          </div>

          <p className="text-gray-700 mb-6">{property.description}</p>

          {/* Agent Info */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Agent Information
            </h3>
            <div className="flex items-center gap-4">
              <img
                src={property.agent.image}
                alt={property.agent.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  {property.agent.name}
                </p>
                <p className="flex items-center text-blue-600">
                  <Phone className="h-4 w-4 mr-1" /> {property.agent.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Agent Button */}
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow">
            Contact Agent
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
