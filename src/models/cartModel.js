// ==============================
// Cart Model
// ==============================
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    profil_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  });
  Cart.associate = (models) => {
    Cart.belongsTo(models.Profil, {
      foreignKey: "profil_id",
      as: "cart_profil",
    });
    Cart.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "cart_product",
    });
  };
  return Cart;
};
