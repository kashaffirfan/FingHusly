const properties = [
  {
    id: 1,
    title: "Modern Apartment in Karachi",
    location: "Clifton Block 5",
    price: 12000000,
    type: "Apartment"
  },
  {
    id: 2,
    title: "Luxury Villa in Lahore",
    location: "DHA Phase 6",
    price: 45000000,
    type: "Villa"
  }
];


const getAllProperties = (req, res) => {
  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties
  });
};

module.exports = { getAllProperties };
