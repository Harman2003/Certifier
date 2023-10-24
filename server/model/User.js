const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "org", "manager"],
    },
    roleID: {
      type: mongoose.Schema.Types.ObjectId,
      //   required: true,
    },
    refreshToken: String,
    // certificateIds: [{type : mongoose.Schema.Types.ObjectId, ref: "Certificate"}],
    // eventIds: [{type: mongoose.Schema.Types.ObjectId, ref: "Event"}]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User',User);