require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
//
const UserRoute = require("./routes/userRoute");
const TravelRoute = require("./routes/travelRoute");
const CommentRoute = require("./routes/commentRoute");
//-------------------
mongoose
  .connect(
    "mongodb+srv://mabrouk:Ma7moud16@cluster1.86eap6r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
  )
  .then(() => {
    console.log("connect to mongoose");
  })
  .catch((e) => {
    console.log(e);
  });

//------------------------------
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//
app.use("/uploads", express.static("./uploads"));
// routes
app.use("/users", UserRoute);
app.use("/travels", TravelRoute);
app.use("/comments", CommentRoute);

// lestining
app.listen(port, () => console.log("server is lestining on port", port));
