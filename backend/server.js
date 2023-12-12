require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const cors = require("cors"); // Import the cors middleware

//express app
const app = express();

//middleware
app.use(cors()); // Use cors middleware to handle CORS issues
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/users", userRouter);

//connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port!!", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
