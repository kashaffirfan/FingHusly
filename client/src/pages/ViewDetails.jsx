import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin, Bed, Bath, Square, Phone, Heart, Share2, ArrowLeft } from "lucide-react";

const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sendingNotification, setSendingNotification] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

      setSendingNotification(true);
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
    } finally {
      setSendingNotification(false);
    }
  };

  const handleShareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
            <svg className="w-12 h-12 mx-auto mb-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Property Not Found</h3>
            <p className="text-sm mb-4">The property you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-900">FindHusly</h2>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Properties
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ✅ Property Image Gallery */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={
                  property.image
                    ? `http://localhost:5000/uploads/${property.image}`
                    : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                }
                alt={property.title}
                className="w-full h-96 object-cover"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center ${
                  isFavorite 
                    ? "bg-red-50 text-red-600 border border-red-200" 
                    : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                }`}
              >
                <Heart className={`h-5 w-5 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                {isFavorite ? "Saved" : "Save"}
              </button>
              <button
                onClick={handleShareProperty}
                className="flex-1 py-3 px-4 bg-white text-gray-700 border border-gray-300 rounded-xl font-medium hover:border-gray-400 transition-all duration-200 flex items-center justify-center"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>
          </div>

          {/* ✅ Property Details */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {property.title}
              </h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                <span className="text-lg">{property.location}</span>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-2xl shadow-lg">
                <p className="text-sm font-medium opacity-90">Price</p>
                <p className="text-3xl font-bold">PKR {Number(property.price).toLocaleString()}</p>
              </div>
            </div>

            {/* Property Features */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Features</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Bed className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{property.bedrooms || "-"}</p>
                  <p className="text-sm text-gray-600">Bedrooms</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Bath className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{property.bathrooms || "-"}</p>
                  <p className="text-sm text-gray-600">Bathrooms</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <Square className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{property.area || "-"}</p>
                  <p className="text-sm text-gray-600">Sq Ft</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {property.description || "No description available for this property."}
              </p>
            </div>

            {/* ✅ Agent Information */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Agent Information</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={
                      property.agentPhoto
                        ? `http://localhost:5000/uploads/${property.agentPhoto}`
                        : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                    }
                    alt={property.agentName || "Agent"}
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {property.agentName || "Unknown Agent"}
                  </h4>
                  <p className="text-gray-600 flex items-center mt-1">
                    <Phone className="h-4 w-4 mr-2 text-blue-500" />
                    {property.agentContact || "Contact information not available"}
                  </p>
                </div>
              </div>
              
              {/* Contact Agent Button */}
              <button
                onClick={handleSendNotification}
                disabled={sendingNotification}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sendingNotification ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3" />
                    Contact Agent
                  </div>
                )}
              </button>
              
              <p className="text-center text-sm text-gray-500 mt-3">
                The agent will be notified of your interest
              </p>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Property Highlights</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Prime Location</h4>
              <p className="text-gray-600 text-sm">Excellent neighborhood with great amenities and transportation</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure Transaction</h4>
              <p className="text-gray-600 text-sm">Verified agent and secure communication channels</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Quick Response</h4>
              <p className="text-gray-600 text-sm">Agent typically responds within a few hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;