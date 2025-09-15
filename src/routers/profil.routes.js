// ==============================
// Imports Point
// ==============================
const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { validationResult } = require("../middlewares/validationResult");
const profilValidation = require("../validations/profilValidation");
const profilController = require("../controllers/profil.controller");

// ==============================
// Router Point
// ==============================
const router = express.Router();

/**
 * @swagger
 * /profil/create:
 *   post:
 *     tags: [Profil]
 *     summary: Ro'yxatdan o'tish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               password:
 *                 type: string
 *                 example: "secret123"
 *     responses:
 *       201:
 *         description: Profil yaratildi
 */
router.post(
  "/create",
  validationResult(profilValidation.createProfilValidation),
  profilController.createProfil
);

/**
 * @swagger
 * /profil/login:
 *   post:
 *     tags: [Profil]
 *     summary: Tizimga kirish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kirildi
 */
router.post(
  "/login",
  validationResult(profilValidation.loginProfilValidation),
  profilController.loginProfil
);

/**
 * @swagger
 * /profil/my:
 *   get:
 *     tags: [Profil]
 *     summary: Mening profilim
 *     responses:
 *       200:
 *         description: Profil ma'lumotlari
 */
router.get("/my", authMiddleware, profilController.getMyProfil);

/**
 * @swagger
 * /profil/all:
 *   get:
 *     tags: [Profil]
 *     summary: Barcha profillar (admin)
 *     responses:
 *       200:
 *         description: Ro'yxat
 */
router.get("/all", profilController.getProfils);

/**
 * @swagger
 * /profil/by_pk/{id}:
 *   get:
 *     tags: [Profil]
 *     summary: ID bo'yicha profil olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Topildi
 */
router.get("/by_pk/:id", profilController.getProfilByPk);

/**
 * @swagger
 * /profil/update/{id}:
 *   put:
 *     tags: [Profil]
 *     summary: Profil yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Yangilandi
 */
router.put(
  "/update/:id",
  authMiddleware,
  validationResult(profilValidation.updateProfilValidation),
  profilController.updateProfil
);

/**
 * @swagger
 * /profil/delete/{id}:
 *   delete:
 *     tags: [Profil]
 *     summary: Profilni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: O'chirildi
 */
router.delete("/delete/:id", authMiddleware, profilController.deleteProfil);

// ==============================
// Export Point
// ==============================
module.exports = router;
