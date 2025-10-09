import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  // ✅ Define states for all input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
        role,
      });

      console.log("✅ Success:", res.data);
      alert("Account created successfully!");
    } catch (err) {
      console.error("❌ Error details:", err.response?.data || err.message);
      alert("❌ Error creating account. Check console.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="agent">Agent</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: "20px" }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
