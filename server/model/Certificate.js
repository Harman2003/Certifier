const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Certificate = new Schema(
  {
    certificateId: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    organisationName:{
      type:String,
      required: true,
    },
    organisationId:{
      type:String,
      required:true,
    },
    email: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      require:true,
    },
    expiry: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Certificate", Certificate);
