// Importing the user model
const UserModel = require("../models/userModel");
const mongoose = require("mongoose");

// Controller function to get all users
const getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database and sort them by createdAt in descending order
    const users = await UserModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res
      .status(500)
      .json({ error: "Unable to retrieve users. Please try again later." });
  }
};

// Controller function to create a new user
const createUser = async (req, res) => {
  // Destructuring user data from the request body
  const {
    firstName,
    lastName,
    email,
    mobile,
    address1,
    address2,
    state,
    city,
    country,
    zipCode,
  } = req.body;

  try {
    // Creating a new user in the database
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      mobile,
      address1,
      address2,
      state,
      city,
      country,
      zipCode,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(400)
      .json({ error: "Invalid request. Please check your input data." });
  }
};

// Controller function to get a single user by ID
const getSingleUser = async (req, res) => {
  const { id } = req.params;

  // Validate if the provided user ID has a valid format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format." });
  }

  try {
    // Retrieve a user by ID from the database
    const user = await UserModel.findById({ _id: id });

    // Check if the user is not found
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res
      .status(500)
      .json({ error: "Unable to retrieve user. Please try again later." });
  }
};

// Controller function to update a user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;

  // Validate if the provided user ID has a valid format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format." });
  }

  try {
    // Update a user by ID in the database with the provided data
    const user = await UserModel.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    // Check if the user is not found
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "Unable to update user. Please try again later." });
  }
};

// Controller function to delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  // Validate if the provided user ID has a valid format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format." });
  }

  try {
    // Delete a user by ID from the database
    const user = await UserModel.findByIdAndDelete({ _id: id });

    // Check if the user is not found
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ error: "Unable to delete user. Please try again later." });
  }
};

// Exporting the controller functions
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
};
