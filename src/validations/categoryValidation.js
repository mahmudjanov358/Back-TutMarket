// ==============================
// Imports Point
// ==============================
const Joi = require("joi");

// ==============================
// Exports Point
// ==============================
exports.createCategoryValidation = Joi.object({
  image: Joi.string()
    .required()
    .pattern(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i),
  imageAlt: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9_ .-]+$/),
  name: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9_ ]+$/),
});

exports.updateCategoryValidation = Joi.object({
  image: Joi.string()
    .pattern(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)
    .optional(),
  imageAlt: Joi.string()
    .pattern(/^[a-zA-Z0-9_ .-]+$/)
    .optional(),
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9_ ]+$/)
    .optional(),
});
