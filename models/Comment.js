const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  author: {
    type: String,
    // required,
  },
  body: {
    type: String,
    // required,
  },
  showStatus: {
    type: Boolean,
    default: false,
  },
  travel: {
    type: mongoose.Types.ObjectId,
    ref: "Travel",
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
