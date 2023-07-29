const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../model/UserSchema");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı veritabanından bul
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı." });
    }

    // Şifre doğrulama
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Geçersiz Şifre." });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Giriş Başarılı", token });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
