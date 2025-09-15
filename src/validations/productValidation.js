// ==============================
// Imports Point
// ==============================
const Joi = require("joi");

// ==============================
// Exports Point
// ==============================
exports.createProductValidation = Joi.object({
  image: Joi.string()
    .required()
    .uri({ scheme: ["http", "https"] }),
  imageAlt: Joi.string()
    .required()
    .pattern(/^[\p{L}\p{N}\s._\-()+%,'"!?–—:;]+$/u),
  title: Joi.string()
    .required()
    .pattern(/^[\p{L}\p{N}\s._\-()+%,'"!?–—:;]+$/u),
  description: Joi.string()
    .required()
    .pattern(/^[\p{L}\p{N}\s._\-()+%,'"!?–—:;]+$/u),
  price: Joi.string().required(),
});

exports.updateProductValidation = Joi.object({
  image: Joi.string()
    .optional()
    .uri({ scheme: ["http", "https"] }),
  imageAlt: Joi.string()
    .optional()
    .pattern(/^[\p{L}\p{N}\s._\-()+%,'"!?–—:;]+$/u),
  title: Joi.string()
    .optional()
    .pattern(/^[\p{L}\p{N}\s._\-()+%,'"!?–—:;]+$/u),
  description: Joi.string()
    .optional()
    .pattern(/^[\p{L}\p{N}\s._\-()+%,'"!?–—:;]+$/u),
  price: Joi.string().optional(),
});
