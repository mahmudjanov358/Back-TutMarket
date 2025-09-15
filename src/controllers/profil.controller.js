// ==============================
// Imports Point
// ==============================
const { Profil, Cart, Favorite, sequelize } = require("../models/main");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// ==============================
// POST: Create Profil Point
// ==============================
exports.createProfil = async (req, res) => {
  try {
    const beforeProfil = await Profil.findOne({
      where: { phone: req.body.phone || req.body.email },
    });
    if (beforeProfil) {
      return res
        .status(400)
        .json({ success: false, message: "Profil mavjud!" });
    }
    const profil = await Profil.create(req.body);
    const token = jwt.sign({ id: profil.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(201).json({
      success: true,
      message: "Profil qo'shildi!",
      token,
    });
  } catch (error) {
    console.error("createProfil error", error);
    return res.status(500).json({ message: "createProfil error" });
  }
};

// ==============================
// POST: Login Profil Point
// ==============================
exports.loginProfil = async (req, res) => {
  try {
    const profil = await Profil.findOne({
      where: { phone: req.body.phone || req.body.email },
    });
    if (!profil) {
      return res
        .status(400)
        .json({ success: false, message: "Profil yoki email band!" });
    }

    const isMatch = await bcrypt.compare(req.body.password, profil.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Telefon raqami yoki parol xato!" });
    }

    const token = jwt.sign({ id: profil.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res
      .status(200)
      .json({ success: true, message: "Profil kirish muvaffaqiyatli!", token });
  } catch (error) {
    console.error("loginProfil error", error);
    return res.status(500).json({ message: "loginProfil error" });
  }
};

// ==============================
// GET: My Profil Point
// ==============================
exports.getMyProfil = async (req, res) => {
  try {
    const profil = await Profil.findByPk(req.profil.id);
    if (!profil) {
      return res
        .status(404)
        .json({ success: false, message: "Profil topilmadi!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Profil", profil: profil });
  } catch (error) {
    console.error("getMyProfil error", error);
    return res.status(500).json({ message: "getMyProfil error" });
  }
};

// ==============================
// GET: Profils Point
// ==============================
exports.getProfils = async (req, res) => {
  try {
    const profils = await Profil.findAll();
    return res
      .status(200)
      .json({ success: true, message: "Profils ro'yxati!", profils: profils });
  } catch (error) {
    console.error("getProfils error", error);
    return res.status(500).json({ message: "getProfils error" });
  }
};

// ==============================
// GET: Profil By Pk Point
// ==============================
exports.getProfilByPk = async (req, res) => {
  try {
    const profil = await Profil.findByPk(req.params.id);
    if (!profil) {
      return res
        .status(404)
        .json({ success: false, message: "Profil topilmadi!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Profil ma'lumotlari", profil: profil });
  } catch (error) {
    console.error("getProfilByPk error", error);
    return res.status(500).json({ message: "getProfilByPk error" });
  }
};

// ==============================
// PUT: Update Profil Point
// ==============================
exports.updateProfil = async (req, res) => {
  try {
    const profil = await Profil.findByPk(req.params.id);
    if (!profil) {
      return res
        .status(404)
        .json({ success: false, message: "Profil topilmadi!" });
    }
    // Only owner can update own profile
    if (req.profil && Number(req.profil.id) !== Number(profil.id)) {
      return res
        .status(403)
        .json({ success: false, message: "Ruxsat yo'q" });
    }
    await profil.update(req.body);
    return res
      .status(200)
      .json({ success: true, message: "Profil yangilandi!" });
  } catch (error) {
    console.error("updateProfil error", error);
    return res.status(500).json({ message: "updateProfil error" });
  }
};

// ==============================
// DELETE: Delete Profil Point
// ==============================
exports.deleteProfil = async (req, res) => {
  try {
    const profil = await Profil.findByPk(req.params.id);
    if (!profil) {
      return res
        .status(404)
        .json({ success: false, message: "Profil topilmadi!" });
    }
    // Only owner can delete own profile
    if (req.profil && Number(req.profil.id) !== Number(profil.id)) {
      return res
        .status(403)
        .json({ success: false, message: "Ruxsat yo'q" });
    }
    // Delete related records first to avoid FK constraint errors
    await sequelize.transaction(async (t) => {
      await Cart.destroy({ where: { profil_id: profil.id }, transaction: t });
      await Favorite.destroy({ where: { profil_id: profil.id }, transaction: t });
      await profil.destroy({ transaction: t });
    });
    return res
      .status(200)
      .json({ success: true, message: "Profil o'chirildi!" });
  } catch (error) {
    console.error("deleteProfil error", error);
    return res.status(500).json({ message: "deleteProfil error" });
  }
};
