const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
});
const collectedcart = mongoose.model("cart", cartSchema);

module.exports = collectedcart;
