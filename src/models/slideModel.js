// ==============================
// Slide Model
// ==============================
module.exports = (sequelize, DataTypes) => {
  const Slide = sequelize.define("Slide", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: { type: DataTypes.STRING, allowNull: false },
    imageAlt: { type: DataTypes.STRING, allowNull: false },
  });
  return Slide;
};
