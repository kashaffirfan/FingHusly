import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch property details
  useEffect(() => {
    fetch(`http://localhost:5000/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setFormData({
          title: data.title || "",
          location: data.location || "",
          price: data.price || "",
          description: data.description || "",
          image: null, // file input starts empty
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching property:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.[0]) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditClick = () => setIsEditing(true);

  const handleSaveChanges = async () => {
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("location", formData.location);
      form.append("price", formData.price);
      form.append("description", formData.description);
      if (formData.image) form.append("image", formData.image);

      const res = await fetch(
        `http://localhost:5000/api/properties/${id}`,
        {
          method: "PUT",
          body: form,
        }
      );

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message || "Failed to update");

      setProperty(updated);
      setIsEditing(false);
      alert("✅ Property updated successfully!");
    } catch (err) {
      console.error("❌ Error updating property:", err);
      alert("❌ Failed to update property");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!property) return <p className="text-center mt-20">Property not found</p>;

  return (
    <div className="min-h-screen flex justify-center items-start p-6 bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">{property.title}</h2>

        {/* Image */}
        <div className="mb-4">
          {property.image && !formData.image ? (
            <img
              src={`http://localhost:5000/uploads/${property.image}`}
              alt={property.title}
              className="w-full h-60 object-cover rounded"
            />
          ) : formData.image ? (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="w-full h-60 object-cover rounded"
            />
          ) : (
            <div className="w-full h-60 bg-gray-200 rounded flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          {isEditing && (
            <input
              type="file"
              name="image"
              accept="image/*"
              className="mt-2"
              onChange={handleChange}
            />
          )}
        </div>

        {/* Form */}
        <input
          type="text"
          name="title"
          value={formData.title}
          disabled={!isEditing}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-3 p-2 border rounded disabled:bg-gray-100"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          disabled={!isEditing}
          onChange={handleChange}
          placeholder="Location"
          className="w-full mb-3 p-2 border rounded disabled:bg-gray-100"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          disabled={!isEditing}
          onChange={handleChange}
          placeholder="Price"
          className="w-full mb-3 p-2 border rounded disabled:bg-gray-100"
        />
        <textarea
          name="description"
          value={formData.description}
          disabled={!isEditing}
          onChange={handleChange}
          rows="4"
          placeholder="Description"
          className="w-full mb-3 p-2 border rounded disabled:bg-gray-100"
        />

        {/* Buttons */}
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={handleEditClick}
              className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Edit Property
            </button>
          ) : (
            <>
              <button
                onClick={handleSaveChanges}
                className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
