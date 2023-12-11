const userModel = require("../models/userModel");
const UserModel = require("../models/userModel");
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
  const users = await UserModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
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
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getSingleUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No user with the ID ${id}`);
  }

  const user = await UserModel.findById({ _id: id });

  if (!user) {
    return res.status(400).json({ error: "No user found" });
  }

  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No user with the ID ${id}`);
  }
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
    return res.status(400).json({ error: "No user found" });
  }
  res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No user with the ID ${id}`);
  }

  const user = await userModel.findByIdAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json({ error: "No user with this" });
  }

  res.status(200).json(user);
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
};
