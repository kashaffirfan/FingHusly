import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const Agents = () => {
  const agents = [
    {
      id: 1,
      name: "Ali Khan",
      role: "Senior Real Estate Agent",
      phone: "+92 300 1234567",
      email: "ali.khan@findhusly.com",
      location: "Bahria Town, Lahore",
      image:
        "https://images.unsplash.com/photo-1603415526960-f7e0328d2b86?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      role: "Property Consultant",
      phone: "+92 322 9876543",
      email: "sara.ahmed@findhusly.com",
      location: "Gulberg, Lahore",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Usman Malik",
      role: "Investment Advisor",
      phone: "+92 345 4567890",
      email: "usman.malik@findhusly.com",
      location: "DHA, Karachi",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Ayesha Khan",
      role: "Luxury Property Specialist",
      phone: "+92 331 6677889",
      email: "ayesha.khan@findhusly.com",
      location: "Islamabad",
      image:
        "https://images.unsplash.com/photo-1614289361968-97150f4f4b56?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-12 lg:px-24">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
        Meet Our Professional Agents
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={agent.image}
              alt={agent.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800">
                {agent.name}
              </h2>
              <p className="text-sm text-gray-500 mb-3">{agent.role}</p>

              <div className="flex items-center text-gray-600 text-sm mb-2">
                <Phone className="h-4 w-4 mr-2 text-blue-500" />
                {agent.phone}
              </div>

              <div className="flex items-center text-gray-600 text-sm mb-2">
                <Mail className="h-4 w-4 mr-2 text-blue-500" />
                {agent.email}
              </div>

              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                {agent.location}
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
                Contact Agent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agents;
