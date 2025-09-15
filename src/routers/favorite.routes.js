// ==============================
// Imports Point
// ==============================
const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { validationResult } = require("../middlewares/validationResult");
const favoriteValidation = require("../validations/favoriteValidation");
const favoriteController = require("../controllers/favorite.controller");

// ==============================
// Router Point
// ==============================
const router = express.Router();
/**
 * @swagger
 * /favorite/create:
 *   post:
 *     tags: [Favorite]
 *     summary: Sevimlilarga qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product_id]
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Qo'shildi
 */
router.post(
  "/create",
  authMiddleware,
  validationResult(favoriteValidation.createFavoriteValidation),
  favoriteController.createFavorite
);

/**
 * @swagger
 * /favorite/my:
 *   get:
 *     tags: [Favorite]
 *     summary: Mening sevimlilarim
 *     responses:
 *       200:
 *         description: Ro'yxat
 */
router.get("/my", authMiddleware, favoriteController.getMyFavorite);

/**
 * @swagger
 * /favorite/all:
 *   get:
 *     tags: [Favorite]
 *     summary: Barcha sevimlilar (admin)
 *     responses:
 *       200:
 *         description: Ro'yxat
 */
router.get("/all", favoriteController.getFavorites);

/**
 * @swagger
 * /favorite/by_pk/{id}:
 *   get:
 *     tags: [Favorite]
 *     summary: ID bo'yicha olish
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
router.get("/by_pk/:id", favoriteController.getFavoriteByPk);

/**
 * @swagger
 * /favorite/delete/{id}:
 *   delete:
 *     tags: [Favorite]
 *     summary: Sevimlidan o'chirish
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
router.delete("/delete/:id", authMiddleware, favoriteController.deleteFavorite);

// ==============================
// Export Point
// ==============================
module.exports = router;
