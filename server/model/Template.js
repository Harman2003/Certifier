const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Template = new Schema(
  {
    data: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    orgId: {
      type:String,
      default: "certify",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Template", Template);
