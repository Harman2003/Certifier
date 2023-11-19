const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Fonts = new Schema({
  name: {
    type: String,
    required: true,
  },
  fonts: {
    type: [Object],
    required: true,
  },
  urls: [],
});

module.exports = mongoose.model("Font", Fonts);
