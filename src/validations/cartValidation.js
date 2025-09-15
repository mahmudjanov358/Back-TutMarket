// ==============================
// Imports Point
// ==============================
const Joi = require("joi");

// ==============================
// Exports Point
// ==============================
exports.createCartValidation = Joi.object({
  product_id: Joi.number().required(),
});
