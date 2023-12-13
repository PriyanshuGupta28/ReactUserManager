const userModel = require("../models/userModel");
const UserModel = require("../models/userModel");
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res
      .status(500)
      .json({ error: "Unable to retrieve users. Please try again later." });
  }
};

const createUser = async (req, res) => {
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

const getSingleUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format." });
  }

  try {
    const user = await UserModel.findById({ _id: id });

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

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format." });
  }

  try {
    const user = await UserModel.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

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

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format." });
  }

  try {
    const user = await userModel.findByIdAndDelete({ _id: id });

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

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
};
