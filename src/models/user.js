const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name."],
    },
    email: {
      type: String,
      required: [true, "Please enter your email."],
      unique: true
    },
    role: {
      type: String,
      required: [true, "no roles given."]
    },
    providerId: {
      type: String
    },
    hasValidLicense: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
