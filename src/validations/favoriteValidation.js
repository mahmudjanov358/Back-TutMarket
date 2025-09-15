// ==============================
// Imports Point
// ==============================
const Joi = require("joi");

// ==============================
// Exports Point
// ==============================
exports.createFavoriteValidation = Joi.object({
  product_id: Joi.number().required(),
});
