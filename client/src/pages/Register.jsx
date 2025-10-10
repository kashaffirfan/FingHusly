import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", formData);
      console.log("✅ Register Response:", res.data);
      setMessage("Account created successfully!");
    } catch (err) {
      console.error("❌ Registration error:", err.response?.data || err.message);
      setMessage("Error creating account.");
    }
  };

  return (
    <div className="register-page">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="agent">Agent</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;
