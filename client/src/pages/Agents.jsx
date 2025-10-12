import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Agents = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/Login");
      return;
    }
    setUser(storedUser);

    // Fetch agent’s properties (optional)
    fetch(`http://localhost:5000/api/properties/agent/${storedUser._id}`)
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error("Error fetching properties:", err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar */}
      <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center sticky top-0 z-50">
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/agent")}
        >
          FindHusly
        </h1>

        <div className="flex items-center space-x-6">
          <button
            onClick={() => alert("No new notifications")}
            className="relative text-gray-600 hover:text-blue-600"
          >
            <span className="material-icons text-2xl">notifications</span>
          </button>

          <button
            onClick={() => navigate("/account")}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            My Account
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ✅ Page Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Welcome, {user?.name || "Agent"}
        </h2>

        {properties.length === 0 ? (
          <p className="text-gray-500">No properties listed yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={`http://localhost:5000/uploads/${property.image}`}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <p className="text-gray-600">{property.location}</p>
                  <p className="text-blue-600 font-bold mt-2">${property.price}</p>
                  <button
                    onClick={() => navigate(`/property/${property._id}`)}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Agents;
