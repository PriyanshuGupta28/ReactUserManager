// Importing the Express library
const express = require("express");

// Importing the controller functions for user operations
const {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
} = require("../controllers/userContoller");

// Creating an Express router instance
const router = express.Router();

// Route for handling GET requests to retrieve all users
router.get("/", getAllUsers);

// Route for handling GET requests to retrieve a single user by ID
router.get("/:id", getSingleUser);

// Route for handling POST requests to create a new user
router.post("/", createUser);

// Route for handling PATCH requests to update a user by ID
router.patch("/:id", updateUser);

// Route for handling DELETE requests to delete a user by ID
router.delete("/:id", deleteUser);

// Exporting the Express router to be used in other parts of the application
module.exports = router;
