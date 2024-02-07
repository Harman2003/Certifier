const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const parameterSchema = new Schema({
  name: { type: String, default: null },
  userId: { type: String, default: null },
  grade: { type: String, default: null },
  creation: { type: String, default: null },
  expiration: { type: String, default: null },
  certificateId: { type: String, default: null },
});

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
      type: String,
      default: "certify",
    },
    parameters: {
      type: parameterSchema,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Template", Template);
