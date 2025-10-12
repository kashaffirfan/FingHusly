import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    emailPrefix: "", // user types only prefix (before @gmail.com)
    contact: "",
    password: "",
    role: "user",
    countryCode: "+92", // default
  });
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});

  // ✅ Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle photo
  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // ✅ Validation logic
  const validate = () => {
    const newErrors = {};
    const contactRegex = /^[0-9]{7,15}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    else if (formData.name.length < 3)
      newErrors.name = "Name must be at least 3 characters.";

    if (!formData.emailPrefix.trim())
      newErrors.email = "Email is required.";
    else if (/\s/.test(formData.emailPrefix))
      newErrors.email = "Email prefix cannot contain spaces.";

    if (!formData.contact.trim())
      newErrors.contact = "Contact number is required.";
    else if (!contactRegex.test(formData.contact))
      newErrors.contact = "Contact number must be 7–15 digits.";

    if (!formData.password)
      newErrors.password = "Password is required.";
    else if (!passwordRegex.test(formData.password))
      newErrors.password =
        "Password must have 8+ chars, uppercase, lowercase, number & special char.";

    if (photo && photo.size > 2 * 1024 * 1024)
      newErrors.photo = "Photo must be under 2MB.";

    return newErrors;
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const finalEmail = `${formData.emailPrefix}@gmail.com`;
    const finalContact = `${formData.countryCode}${formData.contact}`;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", finalEmail);
    data.append("contact", finalContact);
    data.append("password", formData.password);
    data.append("role", formData.role);
    if (photo) data.append("photo", photo);

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        alert("🎉 Registration successful!");
        navigate("/login");
      } else {
        alert(result.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center space-x-2">
          <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900">FindHusly</h2>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
          >
            sign in to your existing account
          </span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-lg rounded-xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            {/* NAME */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* EMAIL */}
            <div>
              <label htmlFor="emailPrefix" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  id="emailPrefix"
                  name="emailPrefix"
                  type="text"
                  placeholder="yourname"
                  value={formData.emailPrefix}
                  onChange={handleChange}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  @gmail.com
                </span>
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* CONTACT (with country code) */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
                >
                  <option value="+92">🇵🇰 +92</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  placeholder="Contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              {errors.contact && <p className="mt-2 text-sm text-red-600">{errors.contact}</p>}
            </div>

            {/* PASSWORD */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* ROLE */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Account Type
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="user">User</option>
                  <option value="agent">Agent</option>
                </select>
              </div>
            </div>

            {/* PHOTO */}
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Profile Photo (Optional)
              </label>
              <div className="mt-1">
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {errors.photo && <p className="mt-2 text-sm text-red-600">{errors.photo}</p>}
            </div>

            {/* TERMS */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{" "}
                <span className="text-blue-600 hover:text-blue-500 cursor-pointer">Terms of Service</span>
              </label>
            </div>

            {/* SUBMIT */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;