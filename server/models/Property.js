import mongoose from "mongoose";

const propertySchema = mongoose.Schema(
  {
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, enum: ["Rent", "Sale"], required: true },
    images: [{ type: String }], // array of image URLs (Cloudinary)
    features: [{ type: String }],
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
