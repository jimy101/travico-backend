const CommentController = require("../controllers/CommentController");
const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");

// show for all users
route.get("/get", CommentController.GetAll);

// create Comment
route.post("/add", CommentController.AddComment);
// edit Comment
route.patch("/:id", verifyToken, CommentController.EditComment);
//delete Comment
route.delete("/:id", verifyToken, CommentController.DeleteComment);
// search blog

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