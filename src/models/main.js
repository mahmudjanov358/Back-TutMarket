// ==============================
// Imports Point
// ==============================
const Sequelize = require("sequelize");
const sequelize = require("../configs/database");

// ==============================
// Models Point and Database with association
// ==============================
const Cart = require("./cartModel")(sequelize, Sequelize);
const Category = require("./categoryModel")(sequelize, Sequelize);
const Favorite = require("./favoriteModel")(sequelize, Sequelize);
const Product = require("./productModel")(sequelize, Sequelize);
const Profil = require("./profilModel")(sequelize, Sequelize);
const Slide = require("./slideModel")(sequelize, Sequelize);

// ==============================
// Models Association Point
// ==============================
Cart.associate(sequelize.models);
Favorite.associate(sequelize.models);
Product.associate(sequelize.models);
Profil.associate(sequelize.models);

// ==============================
// Export Point
// ==============================
module.exports = {
  Cart,
  Category,
  Favorite,
  Product,
  Profil,
  Slide,
  sequelize,
};
