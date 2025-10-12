import React, { useEffect, useState } from "react";
import axios from "axios";

const Account = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "", // ✅ new password field
    role: "",
    photo: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser =
          JSON.parse(localStorage.getItem("agent")) ||
          JSON.parse(localStorage.getItem("user"));

        const token =
          localStorage.getItem("agentToken") ||
          localStorage.getItem("userToken");

        if (!storedUser || !token) return;

        setRole(storedUser.role);

        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = res.data;
        setUser(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          contact: data.contact || "",
          password: "", // leave empty for security
          role: data.role || "",
          photo: data.photo || null,
        });
      } catch (error) {
        console.error("❌ Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files?.[0]) {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSaveChanges = async () => {
    const token =
      localStorage.getItem("agentToken") || localStorage.getItem("userToken");

    if (!token) return alert("Authentication missing. Please login again.");

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("contact", formData.contact);
      form.append("role", formData.role);
      if (formData.password) form.append("password", formData.password); // ✅ include password only if user entered it
      if (formData.photo instanceof File) form.append("photo", formData.photo);

      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updated = res.data;
      setUser(updated);
      setFormData({
        name: updated.name || "",
        email: updated.email || "",
        contact: updated.contact || "",
        password: "", // reset after save
        role: updated.role || "",
        photo: updated.photo || null,
      });
      setIsEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert("❌ Failed to update profile.");
    }
  };

  if (!user) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{role} Account</h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-4">
        {user.photo ? (
          <img
            src={`http://localhost:5000/uploads/${user.photo}`}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        {isEditing && (
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="mt-2"
            onChange={handleChange}
          />
        )}
      </div>

      {/* Form Fields */}
      <input
        type="text"
        name="name"
        value={formData.name}
        disabled={!isEditing}
        onChange={handleChange}
        className="w-full p-2 border rounded-md disabled:bg-gray-100 mb-3"
        placeholder="Full Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        disabled={!isEditing}
        onChange={handleChange}
        className="w-full p-2 border rounded-md disabled:bg-gray-100 mb-3"
        placeholder="Email"
      />
      <input
  type="text"
  name="contact"
  value={formData.contact}
  disabled={!isEditing}
  onChange={handleChange}
  className="w-full p-2 border rounded-md disabled:bg-gray-100 mb-3"
  placeholder="Contact Number"
/>

      {isEditing && (
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-3"
          placeholder="New Password (leave blank to keep current)"
        />
      )}

      {/* Buttons */}
      <div className="flex gap-2 w-full">
        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={() => {
                if (role === "Agent") {
                  localStorage.removeItem("agent");
                  localStorage.removeItem("agentToken");
                } else {
                  localStorage.removeItem("user");
                  localStorage.removeItem("userToken");
                }
                alert("Logged out successfully!");
                window.location.href = "/login";
              }}
              className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSaveChanges}
              className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Account;
