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
    password: "",
    role: "",
    photo: null,
  });
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Starting user fetch...");
        
        const storedUser = JSON.parse(localStorage.getItem("activeUser"));
        const token = localStorage.getItem("activeToken");

        console.log("Stored user:", storedUser);
        console.log("Token exists:", !!token);

        if (!storedUser || !token) {
          console.log("No user or token found, redirecting to login...");
          window.location.href = "/login";
          return;
        }

        setUser(storedUser);
        setRole(storedUser.role);
        setFormData({
          name: storedUser.name || "",
          email: storedUser.email || "",
          contact: storedUser.contact || "",
          password: "",
          role: storedUser.role || "",
          photo: storedUser.photo || null,
        });
        
        if (storedUser.photo) {
          setImagePreview(`http://localhost:5000/uploads/${storedUser.photo}`);
        }
        
        setLoading(false);

        console.log("Making API request...");
        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          { 
            headers: { 
              Authorization: `Bearer ${token}` 
            } 
          }
        );

        console.log("API response:", res.data);
        const data = res.data;
        
        console.log("User data from DB:", {
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
          contact: data.contact
        });
        
        setUser(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          contact: data.contact || "",
          password: "",
          role: data.role || "",
          photo: data.photo || null,
        });
        
        if (data.photo) {
          setImagePreview(`http://localhost:5000/uploads/${data.photo}`);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching user:", error);
        console.error("Error details:", error.response?.data);
        setLoading(false);
        alert("Failed to load profile. Please try logging in again.");
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files?.[0]) {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("activeToken");

    if (!token) {
      alert("Authentication missing. Please login again.");
      window.location.href = "/login";
      return;
    }

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("contact", formData.contact);
      form.append("role", formData.role);
      if (formData.password) form.append("password", formData.password);
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
      setRole(updated.role);
      setFormData({
        ...formData,
        password: "",
      });
      setIsEditing(false);
      
      localStorage.setItem("activeUser", JSON.stringify(updated));
      localStorage.setItem("activeRole", updated.role);
      
      // Update image preview if photo was changed
      if (updated.photo) {
        setImagePreview(`http://localhost:5000/uploads/${updated.photo}`);
      }
      
      alert("✅ Profile updated successfully!");
      
      if (user.role !== updated.role) {
        alert("Your account type has changed. The page will reload to apply new permissions.");
        window.location.reload();
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert("❌ Failed to update profile: " + (error.response?.data?.message || "Please try again."));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("activeUser");
    localStorage.removeItem("activeToken");
    localStorage.removeItem("activeRole");
    alert("Logged out successfully!");
    window.location.href = "/login";
  };

  // Enhanced loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto absolute top-4 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading your profile...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we fetch your information</p>
          <button 
            onClick={() => window.location.href = "/login"}
            className="mt-6 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            Not working? Try logging in again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Profile Unavailable</h3>
            <p className="text-gray-600 mb-6">We couldn't load your profile information. Please try logging in again.</p>
            <button 
              onClick={() => window.location.href = "/login"}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">FH</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              FindHusly
            </h2>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Account Settings</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your profile information and account preferences
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 text-white">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent"></div>
            </div>
            
            <div className="relative flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="relative">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-32 h-32 rounded-2xl object-cover border-4 border-white/80 shadow-2xl transition-all duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center text-white border-4 border-white/80 shadow-2xl backdrop-blur-sm">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  
                  {isEditing && (
                    <label className="absolute -bottom-2 -right-2 bg-white rounded-full p-3 shadow-2xl cursor-pointer hover:bg-gray-50 transition-all duration-200 hover:scale-110 group">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        className="hidden"
                        onChange={handleChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="text-center lg:text-left flex-1">
                <h2 className="text-3xl font-bold mb-2 drop-shadow-sm">
                  {formData.name || "No Name Provided"}
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                    formData.role === "agent" 
                      ? "bg-amber-100 text-amber-800 border border-amber-200" 
                      : "bg-blue-100 text-blue-800 border border-blue-200"
                  }`}>
                    {formData.role ? formData.role.charAt(0).toUpperCase() + formData.role.slice(1) : "User"}
                  </span>
                  <div className="flex items-center space-x-3 text-blue-100">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-sm">{formData.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-8">
            {/* Personal Information Section */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    disabled={!isEditing}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 transition-all duration-200 bg-white shadow-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled={!isEditing}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 transition-all duration-200 bg-white shadow-sm"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Contact Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Contact Number</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    disabled={!isEditing}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 transition-all duration-200 bg-white shadow-sm"
                    placeholder="Enter contact number"
                  />
                </div>

                {/* Role Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Account Type</label>
                  {isEditing ? (
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200 shadow-sm"
                    >
                      <option value="user">User</option>
                      <option value="agent">Agent</option>
                    </select>
                  ) : (
                    <div className="px-4 py-3.5 border border-gray-300 rounded-xl bg-gray-100 text-gray-600 font-medium">
                      {formData.role ? formData.role.charAt(0).toUpperCase() + formData.role.slice(1) : "User"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Password Section */}
            {isEditing && (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  Change Password
                </h3>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">New Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                    placeholder="Enter new password"
                  />
                  <p className="text-sm text-gray-500 mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Leave blank to keep your current password
                  </p>
                </div>
              </div>
            )}

            {/* Role Change Notice */}
            {isEditing && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-blue-800 font-semibold text-lg mb-2">Role Change Notice</p>
                    <p className="text-blue-700">
                      Changing your account type will affect your dashboard access and permissions. 
                      You may need to log out and log back in for changes to take full effect.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 px-6 rounded-xl hover:from-red-600 hover:to-rose-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSaveChanges}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      // Reset image preview if it was changed but not saved
                      if (user.photo) {
                        setImagePreview(`http://localhost:5000/uploads/${user.photo}`);
                      }
                    }}
                    className="flex-1 bg-gradient-to-r from-gray-500 to-slate-600 text-white py-4 px-6 rounded-xl hover:from-gray-600 hover:to-slate-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;