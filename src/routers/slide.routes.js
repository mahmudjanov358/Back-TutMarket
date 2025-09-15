// ==============================
// Imports Point
// ==============================
const express = require("express");
const { validationResult } = require("../middlewares/validationResult");
const slideValidation = require("../validations/slideValidation");
const slideController = require("../controllers/slide.controller");

// ==============================
// Router Point
// ==============================
const router = express.Router();
/**
 * @swagger
 * /slide/create:
 *   post:
 *     tags: [Slide]
 *     summary: Yangi slayd yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Banner 1"
 *               image:
 *                 type: string
 *                 example: "/uploads/banner.png"
 *     responses:
 *       201:
 *         description: Slayd yaratildi
 */
router.post(
  "/create",
  validationResult(slideValidation.createSlideValidation),
  slideController.createSlide
);
/**
 * @swagger
 * /slide/all:
 *   get:
 *     tags: [Slide]
 *     summary: Barcha slaydlar
 *     responses:
 *       200:
 *         description: Ro'yxat
 */
router.get("/all", slideController.getSlides);
/**
 * @swagger
 * /slide/by_pk/{id}:
 *   get:
 *     tags: [Slide]
 *     summary: ID bo'yicha slayd
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
router.get("/by_pk/:id", slideController.getSlideByPk);
/**
 * @swagger
 * /slide/update/{id}:
 *   put:
 *     tags: [Slide]
 *     summary: Slayd yangilash
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
  validationResult(slideValidation.updateSlideValidation),
  slideController.updateSlide
);
/**
 * @swagger
 * /slide/delete/{id}:
 *   delete:
 *     tags: [Slide]
 *     summary: Slayd o'chirish
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
router.delete("/delete/:id", slideController.deleteSlide);

// ==============================
// Export Point
// ==============================
module.exports = router;
