// Load environment variables from a .env file
require("dotenv").config();

// Importing necessary libraries and modules
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const cors = require("cors"); // Import the cors middleware

// Create an Express app
const app = express();

// Apply middleware
app.use(cors()); // Use cors middleware to handle CORS issues
app.use(express.json()); // Parse incoming JSON data
app.use((req, res, next) => {
  console.log(req.path, req.method); // Log the requested path and HTTP method
  next();
});

// Set up routes
app.use("/api/users", userRouter);

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // Start listening for requests once connected to the database
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to the database and listening on port:",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err); // Log any errors that occur during the database connection
  });
