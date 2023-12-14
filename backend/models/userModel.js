// Importing the Mongoose library
const mongoose = require("mongoose");

// Destructuring the Schema class from Mongoose
const { Schema } = mongoose;

// Defining the user schema using the Schema class
const userSchema = new Schema(
  {
    // Defining the firstName field with type String, required, and a minimum length of 5 characters
    firstName: { type: String, required: true, minlength: 5 },
    // Defining the lastName field with type String, required, and a minimum length of 5 characters
    lastName: { type: String, required: true, minlength: 5 },
    // Defining the email field with type String, required, unique, and matching a specific email pattern
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    // Defining the mobile field with type String, required, and matching a specific pattern for international phone numbers
    mobile: {
      type: String,
      required: true,
      match: /^\+[0-9]+$/,
    },
    // Defining the address1 field with type String and required
    address1: { type: String, required: true },
    // Defining the address2 field with type String
    address2: { type: String },
    // Defining the country field with type Object and required
    country: { type: Object, required: true },
    // Defining the state field with type Object and required
    state: { type: Object, required: true },
    // Defining the city field with type Object and required
    city: { type: Object, required: true },
    // Defining the zipCode field with type Number and required
    zipCode: { type: Number, required: true },
  },
  // Adding timestamps to the schema for createdAt and updatedAt fields
  { timestamps: true }
);

// Exporting the Mongoose model named "User" with the defined user schema
module.exports = mongoose.model("User", userSchema);
