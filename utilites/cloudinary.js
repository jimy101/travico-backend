require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
// ==============

// cloudinary.config({
//   cloud_name: "ma7moud",
//   api_key: "822857928361611",
//   api_secret: "fqViRKgeir1dLea3b7qykj1Wjas",
// });

module.exports = cloudinary;
