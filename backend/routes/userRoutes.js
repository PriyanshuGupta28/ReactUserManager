const express = require("express");

const {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
} = require("../controllers/userContoller");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.post("/", createUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
