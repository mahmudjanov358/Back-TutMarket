// ==============================
// Imports Point
// ==============================
const bcrypt = require("bcrypt");

// ==============================
// Profil Model
// ==============================
module.exports = (sequelize, DataTypes) => {
  const Profil = sequelize.define("Profil", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    avatar: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    birthDate: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  });
  Profil.associate = (models) => {
    Profil.hasMany(models.Cart, { foreignKey: "profil_id", as: "cart" });
    Profil.hasMany(models.Favorite, {
      foreignKey: "profil_id",
      as: "favorite_profil",
    });
  };
  Profil.beforeSave((profil) => {
    if (profil.password) {
      profil.password = bcrypt.hashSync(profil.password, 10);
    }
  });
  return Profil;
};
