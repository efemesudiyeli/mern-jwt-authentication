const express = require("express");
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const check = require("validator");
const jwt = require("jsonwebtoken");
const Users = require("../model/UserSchema");

router.get("/", (req, res) => {
  res.send("Signup home page");
});

// new user
router.post("/new", async (req, res) => {
  try {
    console.log("New user create request", req.body);
    const { username, email, password } = req.body;

    // Username Check
    const isUserExist = await Users.findOne({ username: username });
    if (isUserExist) {
      return res.status(201).json({ error: "Username exists." });
    }

    // Email Check
    const isEmailExist = await Users.findOne({
      email: email.toLowerCase().trim(),
    });
    if (isEmailExist || !check.isEmail(email)) {
      return res
        .status(201)
        .json({ error: "Email not available please try another." });
    }

    // Password Check
    let hashedPassword = null;
    if (!check.isStrongPassword(password, { minSymbols: 0, minUppercase: 0 })) {
      return res.status(201).json({ error: "Password is not strong" });
    }
    // If all good hash password then go db=>

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await Users.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // Kullanıcının başarılı bir şekilde kaydolduğunu belirten bir JWT üretme
    const token = jwt.sign(
      {
        userId: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Created successfully",
      createdUser: createdUser,
      token,
    });
    console.log({
      message: "Created successfully",
      createdUser: createdUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(201);
  }
});

module.exports = router;
