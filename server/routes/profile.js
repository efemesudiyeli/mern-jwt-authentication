const express = require("express");
const router = express.Router();
const Users = require("../model/UserSchema");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    // İstekte bulunan kullanıcının bilgilerine eriş
    const user = req.user;

    // Kullanıcı bilgilerini veritabanından al.
    const userData = await Users.findOne({ _id: user.userId });
    res.status(200).json({
      userId: userData._id,
      username: userData.username,
      email: userData.email,
      createdAt: userData.createdAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error 500" });
  }
});

module.exports = router;
