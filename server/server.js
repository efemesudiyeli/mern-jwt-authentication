const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");

app.use("/login", login);
app.use("/signup", signup);
app.use("/profile", profile);

app.get("/", (req, res) => {
  res.send("Aktif");
});

try {
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to db");
    app.listen(port, (req, res) => {
      console.log("started on port " + port);
    });
  });
} catch (error) {
  console.log(error);
}
