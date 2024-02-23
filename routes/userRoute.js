const UserController = require("../controllers/UserController");
const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const bcryt = require("bcrypt");

//thist route is not a must in system it's just for testing
//all users api
// route.get("/json", verifyToken, async (req, res) => {
//   let data = await UserController.GetAll();
//   jwt.verify(req.token, "secret_Key", (err, authData) => {
//     // just for testing perpuse
//     // authData = jwt.decode(req.token);
//     console.log(authData);
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         users: data,
//         msg: "all users",
//       });
//     }
//   });
// });

// user register
route.post("/register", async (req, res) => {
  let { userName, email, password } = req.body;
  bcryt.hash(password, 5, async (err, hash) => {
    let data = await UserController.Register(userName, email, hash);
    res.send("registered successfully");
  });
});

// user login
route.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let data = await UserController.Login(email);
  console.log(req.body)
  const match = await bcryt.compare(password, data.password);
  if (match) {
    let token = jwt.sign(JSON.stringify(data), "secret", (err, token) => {
      // here we store it in local storage
      // localStorage.setItem("token", token);
      res.json(token);
    });
  } else {
    res.sendStatus(403);
  }
});

// middlware for verifying token
// function verifyToken(req, res, next) {
//   // get auth header val
//   const authHeader = req.headers["authorization"];
//   // check of undifined
//   if (typeof authHeader !== "undefined") {
//     const auth = authHeader.split(" ");
//     const authToken = auth[1];
//     req.token = authToken;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }
module.exports = route;
