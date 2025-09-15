// ==============================
// Imports Point
// ==============================
const Joi = require("joi");

// ==============================
// Exports Point
// ==============================
exports.createProfilValidation = Joi.object({
  avatar: Joi.string()
    .optional()
    .pattern(/\.(jpg|jpeg|png|gif|webp)$/),
  name: Joi.string()
    .optional()
    .pattern(/^[a-zA-Z0-9_ ]+$/),
  lastName: Joi.string()
    .optional()
    .pattern(/^[a-zA-Z0-9_ ]+$/),
  email: Joi.string().optional().email(),
  birthDate: Joi.string()
    .optional()
    .pattern(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/),
  phone: Joi.string()
    .required()
    .pattern(/^\+998\d{9}$/),
  password: Joi.string()
    .required()
    .min(4)
    .max(32)
    .pattern(/^[a-zA-Z0-9_]+$/),
});

exports.loginProfilValidation = Joi.object({
  phone: Joi.string()
    .required()
    .pattern(/^\+998\d{9}$/),
  password: Joi.string()
    .required()
    .min(4)
    .max(32)
    .pattern(/^[a-zA-Z0-9_]+$/),
});

exports.updateProfilValidation = Joi.object({
  avatar: Joi.string()
    .optional()
    .pattern(/\.(jpg|jpeg|png|gif|webp)$/),
  name: Joi.string()
    .optional()
    .pattern(/^[a-zA-Z0-9_ ]+$/),
  lastName: Joi.string()
    .optional()
    .pattern(/^[a-zA-Z0-9_ ]+$/),
  email: Joi.string().optional().email(),
  birthDate: Joi.string()
    .optional()
    .pattern(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/),
  phone: Joi.string()
    .optional()
    .pattern(/^\+998\d{9}$/),
  password: Joi.string()
    .optional()
    .min(4)
    .max(32)
    .pattern(/^[a-zA-Z0-9_]+$/),
});
