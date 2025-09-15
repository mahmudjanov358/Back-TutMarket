// ==============================
// Product Model
// ==============================
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: { type: DataTypes.STRING, allowNull: false },
    imageAlt: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
  });
  Product.associate = (models) => {
    Product.belongsTo(models.Cart, {
      foreignKey: "product_id",
      as: "cart_product",
    });
    Product.belongsTo(models.Favorite, {
      foreignKey: "product_id",
      as: "favorite_product",
    });
  };
  return Product;
};
