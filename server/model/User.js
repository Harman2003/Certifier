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
      default:""
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "org", "manager"],
    },
    orgid: {
      //auto set krlo for organisation only
      type: String,
      unique: true,
      validate: {
        validator: function (value) {
          if (this.role !== "org") {
            return true;
          }
          return /^[0-9a-fA-F]{4}$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid orgid. It should be a four-character hex string.`,
      },
    },
    oauth: {
      type: Boolean,
      default: false,
    },
    picture: {
      type: String,
      default:""
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