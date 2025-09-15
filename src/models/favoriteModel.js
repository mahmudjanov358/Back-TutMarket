// ==============================
// Favorite Model
// ==============================
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define("Favorite", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    profil_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
  });
  Favorite.associate = (models) => {
    Favorite.belongsTo(models.Profil, {
      foreignKey: "profil_id",
      as: "favorite_profil",
    });
    Favorite.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "favorite_product",
    });
  };
  return Favorite;
};
