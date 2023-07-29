const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
  //Request headerinden tokeni alın
  const token = req.header("Authorization").replace("Bearer ", "");

  // Token yoksa ve doğrulanamazsa yetkilendirme hatası
  if (!token) {
    return res
      .status(401)
      .json({ error: "Yetkilendirme hatası. Token bulunamadı." });
  }

  try {
    // JWT doğrulaması ve payload içerisindeki bilgileri al.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanıcının bilgilerini requeste ekle
    req.user = decoded;
    console.log(req.user);

    // Middleware işlemi bitti
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Yetkilendirme hatası. Geçersiz token" });
  }
};

module.exports = authMiddleware;
