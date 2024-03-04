const mongoose = require("mongoose");

const travelSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgUrl: {
    type: String,
    // required: true,
  },
  imgSrc: {
    type: String,
    // required: true,
  },
  imgScureSrc: {
    type: String,
    // required: true,
  },
  cat: {
    type: String,
    required: true,
  },
});
travelSchema.index({ title: 1 });
travelSchema.index({ cat: 1 });
const Travel = mongoose.model("Travel", travelSchema);
module.exports = Travel;
