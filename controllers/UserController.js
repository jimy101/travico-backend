const User = require("../models/User");
const jwt = require("jsonwebtoken");
//reg
const Register = async (_name, _email, _password, _age) => {
  try {
    let data = await User.create({
      userName: _name,
      email: _email,
      password: _password,
    });
    data ? console.log("added successfully") : console.log(" failed");
  } catch (error) {
    console.log(error);
  }
};

// login
const Login = async (_email) => {
  try {
    let data = await User.findOne({
      email: _email,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
// get user
const GetUser = async () => {
  try {
    let data = await User.find(
      {},
      {
        userName: 1,
        _id: 1,
        email: 1,
        password: 1,
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { Login, GetUser, Register };
