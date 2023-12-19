const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const nanoid = require("nanoid").nanoid;

const Event = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(6),
      immutable: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "Training",
        "Competition",
        "Workshop",
        "Seminar",
        "Conference",
        "Cultural",
        "Other",
      ],
      required: true,
    },
    duration: {
      type: Number,
      required:true
    },
    managers: [
      {
        type: String,
        validate: [
          (val) =>
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
              val
            ),
          "Invalid email address",
        ],
      },
    ],
    description: {
      type: String,
      maxLength: 500,
    },
    template: {
      type: mongoose.Types.ObjectId,
      ref: "Template",
      required:true
    },
    certificates: {
      type: Number,
      default: 0,
    },
    orgId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Event', Event);
