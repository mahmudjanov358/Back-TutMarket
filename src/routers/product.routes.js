// ==============================
// Imports Point
// ==============================
const express = require("express");
const { validationResult } = require("../middlewares/validationResult");
const productValidation = require("../validations/productValidation");
const productController = require("../controllers/product.controller");

// ==============================
// Router Point
// ==============================
const router = express.Router();
/**
 * @swagger
 * /product/create:
 *   post:
 *     tags: [Product]
 *     summary: Yangi mahsulot yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "iPhone 14"
 *               price:
 *                 type: number
 *                 example: 999.99
 *               category_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Mahsulot yaratildi
 */
router.post(
  "/create",
  validationResult(productValidation.createProductValidation),
  productController.createProduct
);
/**
 * @swagger
 * /product/all:
 *   get:
 *     tags: [Product]
 *     summary: Barcha mahsulotlar
 *     responses:
 *       200:
 *         description: Ro'yxat
 */
router.get("/all", productController.getProducts);
/**
 * @swagger
 * /product/by_pk/{id}:
 *   get:
 *     tags: [Product]
 *     summary: ID bo'yicha mahsulot olish
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
router.get("/by_pk/:id", productController.getProductByPk);
/**
 * @swagger
 * /product/update/{id}:
 *   put:
 *     tags: [Product]
 *     summary: Mahsulotni yangilash
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
  validationResult(productValidation.updateProductValidation),
  productController.updateProduct
);
/**
 * @swagger
 * /product/delete/{id}:
 *   delete:
 *     tags: [Product]
 *     summary: Mahsulotni o'chirish
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
router.delete("/delete/:id", productController.deleteProduct);

// ==============================
// Export Point
// ==============================
module.exports = router;
