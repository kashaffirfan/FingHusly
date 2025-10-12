import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all properties
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching properties:", err);
        setLoading(false);
      });
  }, []);

  // Send notification to agent
  const handleSendNotification = async (property) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Please login to send a notification");
        navigate("/Login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/users/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    return <p className="text-center mt-10 text-gray-600">Loading properties...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar */}
      <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center sticky top-0 z-50">
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          FindHusly
        </h1>

        <div className="flex items-center space-x-6">
          <button
            onClick={() => navigate("/account")}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            My Account
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/Login");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ✅ Properties Grid */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Available Properties
        </h2>

        {properties.length === 0 ? (
          <p className="text-gray-500">No properties found.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={`http://localhost:5000/uploads/${property.image}`}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {property.title}
                  </h3>
                  <p className="text-gray-600">{property.location}</p>
                  <p className="text-blue-600 font-semibold mt-1">
                    ${property.price}
                  </p>

                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => navigate(`/viewdetails/${property._id}`)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleSendNotification(property)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Notify Agent
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
