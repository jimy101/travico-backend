const Comment = require("../models/Comment");
const jwt = require("jsonwebtoken");
// get all comments
const GetAll = async (req, res) => {
  try {
    let data = await Comment.find(
      {},
      {
        _id: 1,
        author: 1,
        body: 1,
        showStatus: 1,
      }
    );
    res.json({
      comments: data,
      msg: "all comments",
    });
  } catch (error) {
    console.log(error);
  }
};
// add
const AddComment = async (req, res) => {
  let { author, body } = req.body;
  console.log(req.body);
  let data = Comment.create({
    author,
    body,
  });
  if (data == undefined) {
    res.send("Added faild ");
  } else {
    res.send("added successfully ");
  }
};
// update status to allow 
const EditComment = async (req, res) => {
  jwt.verify(req.token, "secret", async (err, authData) => {
    authData = jwt.decode(req.token);
    if (err) {
      res.sendStatus(403);
    } else {
      let { showStatus } = req.body;
      let data = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          showStatus: showStatus,
        }
      );
      res.json({
        comments: data,
        msg: `added`,
      });
    }
  });
};
// delete
const DeleteComment = async (req, res) => {
  jwt.verify(req.token, "secret", async (err, authData) => {
    authData = await jwt.decode(req.token);
    if (err) {
      res.sendStatus(403);
    } else {
      let item = await Comment.deleteOne({ _id: req.params.id });
      // console.log(item);
      res.send("succses");
    }
  });
};

// export
module.exports = {GetAll,AddComment,EditComment,DeleteComment}