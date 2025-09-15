// ==============================
// Imports Point
// ==============================
const Joi = require("joi");

// ==============================
// Exports Point
// ==============================
exports.createSlideValidation = Joi.object({
  image: Joi.string()
    .required()
    .pattern(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i),
  imageAlt: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9_ .-]+$/),
});

exports.updateSlideValidation = Joi.object({
  image: Joi.string()
    .optional()
    .pattern(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i),
  imageAlt: Joi.string()
    .optional()
    .pattern(/^[a-zA-Z0-9_ .-]+$/),
});
