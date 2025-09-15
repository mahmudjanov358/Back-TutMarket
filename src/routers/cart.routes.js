// ==============================
// Imports Point
// ==============================
const express = require("express");
const { validationResult } = require("../middlewares/validationResult");
const cartValidation = require("../validations/cartValidation");
const cartController = require("../controllers/cart.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");

// ==============================
// Router Point
// ==============================
const router = express.Router();

/**
 * @swagger
 * /cart/create:
 *   post:
 *     tags: [Cart]
 *     summary: Savatga mahsulot qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [profil_id, product_id, quantity]
 *             properties:
 *               profil_id:
 *                 type: integer
 *                 example: 1
 *               product_id:
 *                 type: integer
 *                 example: 5
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Cart qo'shildi
 */
router.post(
  "/create",
  authMiddleware,
  validationResult(cartValidation.createCartValidation),
  cartController.createCart
);
/**
 * @swagger
 * /cart/my:
 *   get:
 *     tags: [Cart]
 *     summary: Mening savatcham
 *     responses:
 *       200:
 *         description: Foydalanuvchining savatchasi
 */
router.get("/my", authMiddleware, cartController.getMyCart);
/**
 * @swagger
 * /cart/all:
 *   get:
 *     tags: [Cart]
 *     summary: Barcha cart yozuvlari (admin)
 *     responses:
 *       200:
 *         description: Cart ro'yxati
 */
router.get("/all", cartController.getCarts);
/**
 * @swagger
 * /cart/by_pk/{id}:
 *   get:
 *     tags: [Cart]
 *     summary: Cartni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Topildi
 *       404:
 *         description: Topilmadi
 */
router.get("/by_pk/:id", cartController.getCartByPk);
/**
 * @swagger
 * /cart/delete/{id}:
 *   delete:
 *     tags: [Cart]
 *     summary: Cartni o'chirish
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
router.delete("/delete/:id", authMiddleware, cartController.deleteCart);

// ==============================
// Export Point
// ==============================
module.exports = router;
