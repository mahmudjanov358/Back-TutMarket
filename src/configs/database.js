// ==============================
// Imports Point
// ==============================
const { Sequelize } = require("sequelize");
require("dotenv").config();

// ==============================
// Database Instance
// ==============================
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
  }
);

// ==============================
// Export Point
// ==============================
module.exports = sequelize;
