// ==============================
// Imports Point
// ==============================
const express = require("express");
const { validationResult } = require("../middlewares/validationResult");
const categoryValidation = require("../validations/categoryValidation");
const categoryController = require("../controllers/category.controller");

// ==============================
// Router Point
// ==============================
const router = express.Router();
/**
 * @swagger
 * /category/create:
 *   post:
 *     tags: [Category]
 *     summary: Yangi kategoriya yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Elektronika"
 *     responses:
 *       201:
 *         description: Kategoriya yaratildi
 */
router.post(
  "/create",
  validationResult(categoryValidation.createCategoryValidation),
  categoryController.createCategory
);
/**
 * @swagger
 * /category/all:
 *   get:
 *     tags: [Category]
 *     summary: Barcha kategoriyalar ro'yxati
 *     responses:
 *       200:
 *         description: Ro'yxat qaytariladi
 */
router.get("/all", categoryController.getCategories);
/**
 * @swagger
 * /category/by_pk/{id}:
 *   get:
 *     tags: [Category]
 *     summary: ID bo'yicha kategoriya olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *     type: integer
 *     responses:
 *       200:
 *       description: Topildi
 *       404:
 *         description: Topilmadi
 */
router.get("/by_pk/:id", categoryController.getCategoryByPk);
/**
 * @swagger
 * /category/update/{id}:
 *   put:
 *     tags: [Category]
 *     summary: Kategoriya yangilash
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
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Yangilandi
 */
router.put(
  "/update/:id",
  validationResult(categoryValidation.updateCategoryValidation),
  categoryController.updateCategory
);
/**
 * @swagger
 * /category/delete/{id}:
 *   delete:
 *     tags: [Category]
 *     summary: Kategoriya o'chirish
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
router.delete("/delete/:id", categoryController.deleteCategory);

// ==============================
// Export Point
// ==============================
module.exports = router;
