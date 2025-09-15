// ==============================
// Imports Point
// ==============================
const jwt = require("jsonwebtoken");
const { Profil } = require("../models/main");

// ==============================
// Auth Middleware Point
// ==============================
exports.authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token kiriting!" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const profil = await Profil.findByPk(decoded.id);
    if (!profil) {
      return res.status(401).json({ message: "Profil topilmadi!" });
    }
    req.profil = profil;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token muddati tugagan!" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Token xatolik!" });
    }
    console.error("authMiddleware xatolik: ", error);
    return res.status(500).json({ message: "authMiddleware xatolik" });
  }
};
