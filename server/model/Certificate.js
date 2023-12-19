const mongoose = require("mongoose");
const nanoid = require("nanoid").nanoid;
const Schema = mongoose.Schema;

const Certificate = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: ()=>nanoid(8),
      immutable: true,
    },
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
    },
    grade: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expirationAt: {
      type: Date,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
    },
    status: {
      type: String,
      enum: ["active", "revoked"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Certificate", Certificate);
