const TravelController = require("../controllers/TravelController");
const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
//===
// const fullPath = path.join(__dirname, "..", "uploads");
// storage
const Storage = multer.diskStorage({
  // destination: (req, file, callback) => {
  //   callback(null, fullPath);
  // },
  filename: (req, file, cb) => {
    const fullName = new Date().getTime().toString() + file.originalname;
    // file.finalDist = `uploads/${fullName}`;
    cb(null, fullName);
  },
});
const upload = multer({ storage: Storage });
// show for all users
route.get("/show", TravelController.ShowAll);

// create Travel
route.post(
  "/add",
  verifyToken,
  upload.single("imgUrl"),
  TravelController.AddTravel
);
// edit Travel
route.patch(
  "/:id",
  verifyToken,
  upload.single("imgUrl"),
  TravelController.EditTravel
);
//delete Travel
route.delete("/:id", verifyToken, TravelController.DeleteTravel);

// mid
function verifyToken(req, res, next) {
  // get auth header val
  const authHeader = req.headers["authorization"];
  // check of undifined
  if (typeof authHeader !== "undefined") {
    const auth = authHeader.split(" ");
    const authToken = auth[1];
    req.token = authToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
module.exports = route;
