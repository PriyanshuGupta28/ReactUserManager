const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, minlength: 5 },
    lastName: { type: String, required: true, minlength: 5 },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    mobile: {
      type: String,
      required: true,
      match: /^\+[0-9]+$/,
    },
    address1: { type: String, required: true },
    address2: { type: String },
    state: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
