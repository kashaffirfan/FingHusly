import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
 // const isAgent = true;
  const listings = [
    {
      id: 1,
      title: "Luxury Apartment in City Center",
      location: "Downtown, Karachi",
      price: "PKR 85,000 / month",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    },
    {
      id: 2,
      title: "Cozy Family House",
      location: "Bahria Town, Lahore",
      price: "PKR 120,000 / month",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    },
    {
      id: 3,
      title: "Modern Studio Apartment",
      location: "Clifton, Karachi",
      price: "PKR 65,000 / month",
      image: "https://images.unsplash.com/photo-1598300053650-8a93d4a0f94b?w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-extrabold text-blue-600 hover:text-blue-700 tracking-tight"
            >
              FindHusly
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/buy" className="text-gray-700 hover:text-blue-600 font-medium">
                Buy
              </Link>
              <Link to="/rent" className="text-gray-700 hover:text-blue-600 font-medium">
                Rent
              </Link>
              <Link to="/sell" className="text-gray-700 hover:text-blue-600 font-medium">
                Sell / List Property
              </Link>
              <Link to="/agents" className="text-gray-700 hover:text-blue-600 font-medium">
                Agents
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </Link>

              {/* Login / Register Buttons */}
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 focus:outline-none"
              >
                {menuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                Home
              </Link>
              <Link to="/agents" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                Agents
              </Link>
              <Link to="/view/1" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                Properties
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* 🔹 Property Listings Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center sm:text-left">
          Featured Properties
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 sm:h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500 mb-3">{item.location}</p>
                <p className="text-blue-600 font-semibold mb-4">{item.price}</p>
                <Link
                  to={`/view/${item.id}`}
                  className="block w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg text-center hover:bg-gray-900 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Footer */}
      <footer className="max-w-7xl mx-auto mt-12 text-center text-sm text-gray-500 pb-6">
        © {new Date().getFullYear()} FindHusly — All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
